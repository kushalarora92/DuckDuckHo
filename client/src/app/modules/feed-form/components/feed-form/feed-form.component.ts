import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FeedService } from '../../services/feed/feed.service';
import { IFeedDetails } from '../../models/IFeedDetails';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.scss']
})
export class FeedFormComponent implements OnInit {

  feedForm: FormGroup;
  submitted: Boolean = false;
  isLoading: Boolean = false;
  responseSuccess: String = '';
  responseError: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private feedService: FeedService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      fedAt: ['', [Validators.required]],
      foodItems: ['', Validators.required],
      ducksQty: ['', Validators.required],
      totalFoodUsed: ['', Validators.required],
      isTaskRecurring: false,
      address: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        landmark: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
    });
  }

  get f() { return this.feedForm.controls; }

  onIsTaskRecurringClick() {
    this.feedForm.patchValue({
      isTaskRecurring: !this.feedForm.value.isTaskRecurring,
    })
  }

  async onSubmitClick() {
    this.submitted = true;

    // stop here if form is invalid; Validations should show up now on screen
    if (this.feedForm.invalid) {
      return;
    }

    const feedRecord: IFeedDetails = { ...this.feedForm.value, ...{ foodItems: [ this.feedForm.value.foodItems ]} };

    try {

      if (!this.authenticationService.isLoggedIn) {
        return await this.authenticationService.openLoginModal();
      }

      this.isLoading = true;
      const response = await this.feedService.submit(feedRecord);
      this.isLoading = false;
      this.feedForm.reset();
      this.submitted = false;
      this.responseSuccess = 'Record Submission Success';
      window.setTimeout(() => {
        this.responseSuccess = '';
      }, 5000);
    } catch (e) {
      this.isLoading = false;
      this.responseError = 'Record Submission Failed';
      window.setTimeout(() => {
        this.responseError = '';
      }, 5000);
    }
  }

}
