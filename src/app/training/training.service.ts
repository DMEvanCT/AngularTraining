import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Exercise } from './exercise.model';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators'
import {Subscription} from "rxjs";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  private finishedExercise: Exercise[] = [];
  private fbSubs: Subscription[] = []


  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().map(docData => {
      return docData.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data(),


        };

      });
    }).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
    //  console.log(this.availableExercises)
    }, error => {

    }));
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date})
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exercisesChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
   this.fbSubs.push( this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscruptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
