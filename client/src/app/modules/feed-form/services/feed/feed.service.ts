import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IFeedDetails } from '../../models/IFeedDetails';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient,
  ) { }

  submit(data: IFeedDetails) {
    return this.http.post('/api/feed-details', data).toPromise();
  }
}
