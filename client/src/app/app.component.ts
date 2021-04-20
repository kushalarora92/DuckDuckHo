import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'duckduckho';
  loginForm: FormGroup;
  submitted: Boolean = false;
  isLoading: Boolean = false;
  responseSuccess: String = '';
  responseError: String = '';
  loginDetails: String = '';
  submitAction: Number = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {}

  openLoginModal() {
    this.authenticationService.openLoginModal();
  }
  
  closeLoginModal() {
    this.authenticationService.closeLoginModal();
    this.updateLoginDetails();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.updateLoginDetails();
  }

  updateLoginDetails() {
    if (this.authenticationService.isLoggedIn) {
      this.loginDetails = `${this.authenticationService.loggedInUser.email}`;
    } else {
      this.loginDetails = 'Login';
    }
  }

  onLoginDetailsClick() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.logout();
      this.updateLoginDetails();
      this.responseSuccess = 'User Logout Success';
      window.setTimeout(() => {
        this.responseSuccess = '';
      }, 5000);
    } else {
      this.authenticationService.openLoginModal();
    } 
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onSubmitClick(action: Number) {
    this.submitted = true;
    this.submitAction = action;

    // stop here if form is invalid; Validations should show up now on screen
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    try {

      this.isLoading = true;

      let response = null;
      if (action === 1) { // login
        response = await this.authenticationService.login(credentials.email, credentials.password);
        this.responseSuccess = 'User Login Success';
      } else if (action === 0) { // register
        response = await this.authenticationService.register(credentials.email, credentials.password);
        this.responseSuccess = 'User Register Success';
      } else {
        return; // noop
      }
      this.isLoading = false;
      this.loginForm.reset();
      this.submitted = false;
      this.submitAction = null;
      window.setTimeout(() => {
        this.responseSuccess = '';
      }, 5000);
      this.closeLoginModal();
    } catch (e) {
      this.isLoading = false;
      this.responseError = (e.error && e.error.message) || 'User Action Failed';
      this.submitAction = null;
      window.setTimeout(() => {
        this.responseError = '';
      }, 5000);
    }
  }
}
