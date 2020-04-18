import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Subscription, observable, from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromAuthAction from '../login/store/auth.action';
import { Store } from '@ngrx/store';
import * as fromAppStateRoot from '../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //#region error messages
  errorUsername = 'user name must be a valid email';
  errorPassword = 'at least 6 characters is required';
  errorMessage = 'invalid user name and password';
  errorConfirmation = 'password does not much';
  //#endregion error messages

  //#region  declarations
  loginSubscription: Subscription;
  passwordMatch = true;
  isLoading = false;
  error = null;
  signingUp = false;
  signInSub: Subscription;
  //#endregion declaration

  constructor(private router: Router, private store: Store<fromAppStateRoot.AppState>) { }

  ngOnInit(): void {
   this.signInSub = this.store.select('authState').subscribe(authState => {
      this.error = authState.loginError;
      this.isLoading = authState.loading;
    });
  }

  submit(form: NgForm) {
    this.isLoading = true;
    if (!form.value) { return; }
    const email = form.value.email;
    const password = form.value.password;

    //#region sign up and login
    if (this.signingUp) {
      const confirmPassword = form.value.confirmPassword;
      if (confirmPassword !== password) {
        this.isLoading = false;
        form.reset();
        this.passwordMatch = false; return;
      }
      //  loginObservable = this.loginSer.onSignUp(email, password) as Observable<AuthenticationResponce>;
      this.store.dispatch(new fromAuthAction.SignUpStart({
        email,
        password
      }));
    } else {
      this.store.dispatch(new fromAuthAction.LoginStart({
        email,
        password
      }));
      // loginObservable = this.loginSer.onLogin(email, password) as Observable<AuthenticationResponce>;
    }

  }
  signUp() {
    this.signingUp = true;
  }

  switchToLogin() {
    this.signingUp = false;
  }
  onHandleClose() {
    // this.error = null;
    this.store.dispatch( new fromAuthAction.ClearError());
  }
  ngOnDestroy() {
    if (this.signInSub) {
     this.signInSub.unsubscribe();
    }
 

  }


}
