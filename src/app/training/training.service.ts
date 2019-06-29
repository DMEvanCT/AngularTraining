import {Exercise} from "./exercise.model";
import {Subject} from "rxjs";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  private runningExercise: Exercise;
  private exersises: Exercise[] = []
 private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 110, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 180},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 110},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8},

  ];


 getAvailableExercises() {
   return this.availableExercises.slice();
 }

 startExercise(selectedID: string)  {
  this.runningExercise = this.availableExercises.find(ex => ex.id === selectedID);
  this.exerciseChanged.next({...this.runningExercise});

 }

 completeExercise() {
   this.exersises.push({...this.runningExercise, date: new Date(), state: 'completed'});
   this.runningExercise = null;
   this.exerciseChanged.next(null)
 }

 cancelExercise(progress: number) {
   this.exersises.push({...this.runningExercise, date: new Date(), state: 'canceled', duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.duration * (progress / 100) });
   this.runningExercise = null;
   this.exerciseChanged.next(null)
 }




 getRunningExercise() {
   return { ...this.runningExercise }
 }

 getCompleteOrCanceledExercises() {
   return this.exersises.slice()
 }



}
