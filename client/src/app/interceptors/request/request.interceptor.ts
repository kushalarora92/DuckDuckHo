import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseUrl = environment.apiEndpoint;

    const allowedUrls = ['/api/user/login', '/api/user/register'];

    if (!allowedUrls.includes(request.url) && !this.authenticationService.isLoggedIn) {
      this.authenticationService.openLoginModal();
      return;
    }

    const patchUpdates: any = {
      url: `${baseUrl}${request.url}`,
    };

    if (!allowedUrls.includes(request.url)) {
      patchUpdates.setHeaders = {
        Authorization: `Bearer ${this.authenticationService.loggedInUser.token}`,
      }
    }

    request = request.clone(patchUpdates);

    return next.handle(request);
  }
}
