// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../../../src/environments/environment';
import { Router } from '@angular/router';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	private token:String;
	  
	constructor(private router:Router){}

	// intercept request and add token
	intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.search(environment.api) === 0) return this.handleApiRequest(request, next);
    	else return next.handle(request);
	}

	handleApiRequest(request, next) {
		if(localStorage.getItem(environment.authTokenKey) != null) this.token = localStorage.getItem(environment.authTokenKey);
		else this.token = "NA";
	
		request = this.token
		  ? request.clone({
			  setHeaders: {
				Authorization: `Bearer ${this.token}`
			  }
			})
		  : request;
	
		const handler = next.handle(request).pipe(
		  catchError((error, caught) => {
			if (error.status === 401 || error.status === 403) {
				this.router.navigate(["/auth/login"]);
				return throwError(error);	  
			}  else {
			  return throwError(error);
			}
		  })
		);
	
		return handler;
	  }
}
