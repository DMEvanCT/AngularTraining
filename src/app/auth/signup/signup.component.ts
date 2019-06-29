import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {log} from "util";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  terms = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // only allow people 18 years or older
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)


  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });

  }

  setTerms() {
      this.terms = true;


  }



  




}
