import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.scss']
})
export class FeedFormComponent implements OnInit {

  feedForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.feedForm = this.formBuilder.group({
      feedTime: ['', [Validators.required]],
      feedFood: ['', Validators.required],
      ducksQty: ['', Validators.required],
      feedFoodUsed: ['', Validators.required],
      feedAddress: this.formBuilder.group({
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

  onSubmitClick() {
    this.submitted = true;

    // stop here if form is invalid; Validations should show up now on screen
    if (this.feedForm.invalid) {
      return;
    }

    // #TODO handle loader & error at interceptor level

    console.log(this.feedForm.value);
    // http call here



  }

}
