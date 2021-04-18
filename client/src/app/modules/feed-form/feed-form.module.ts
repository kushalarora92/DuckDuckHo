import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FeedFormRoutingModule } from './feed-form-routing.module';
import { FeedFormComponent } from './components/feed-form/feed-form.component';

@NgModule({
  declarations: [FeedFormComponent],
  imports: [
    CommonModule,
    FeedFormRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FeedFormModule { }
