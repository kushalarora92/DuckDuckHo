import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FeedService } from '../../services/feed/feed.service';
import { IFeedDetails } from '../../models/IFeedDetails';

@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.scss']
})
export class FeedFormComponent implements OnInit {

  feedForm: FormGroup;
  submitted: Boolean = false;
  isLoading: Boolean = false;
  isError: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private feedService: FeedService,
  ) {}

  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      fedAt: ['', [Validators.required]],
      foodItems: ['', Validators.required],
      ducksQty: ['', Validators.required],
      totalFoodUsed: ['', Validators.required],
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

  async onSubmitClick() {
    this.submitted = true;

    // stop here if form is invalid; Validations should show up now on screen
    if (this.feedForm.invalid) {
      return;
    }

    const feedRecord: IFeedDetails = { ...this.feedForm.value, ...{ foodItems: [ this.feedForm.value.foodItems ]} };

    try {
      this.isLoading = true;
      const response = await this.feedService.submit(feedRecord);
      this.feedForm.reset();
      this.submitted = false;
    } catch (e) {
      this.isLoading = false;
      this.isError = true; // #TODO handle error & success message display in view;≥
    }
  }

}
