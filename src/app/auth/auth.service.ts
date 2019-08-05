import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth'
import {TrainingService} from "../training/training.service";

@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>()
  private  isAAuthenticated = false;



  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password
    ).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    });

  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    });

  }


  initAuthListner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
    this.isAAuthenticated = true;
    this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscruptions()
        this.afAuth.auth.signOut()
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAAuthenticated = false;
      }
    });
  }



  logout() {
    this.afAuth.auth.signOut()

  }



    isAuth() {
      return this.isAAuthenticated;
    }


}
