import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthNoticeService, AuthService, Login, SignOn } from '../../../../core/auth';
import { AppState } from '../../../../core/reducers';
import { Observable, Subject } from 'rxjs';
// import { FirestoreAuthService } from '../../../../core/_services';

@Component({
	selector: 'kt-signon',
	templateUrl: './signon.component.html',
	encapsulation: ViewEncapsulation.None
})
export class SignOnComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	loading: boolean = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	curUserName:any;
	curPassword:any;

	private unsubscribe: Subject<any>;
	private returnUrl: any;

	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		// private authFireService: FirestoreAuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit(): void {
		this.initLoginForm();
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	ngAfterViewInit(): void {   
	   //Sample	
       // http://localhost:4200/#/auth/authsignon?uid=eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiI2NjhiOTg4NGJjYmUwODRkMzUzNGQxNTRhZWI0NDhiOGMwMWI5ZjU5YmZkMzE3NjQ2YWRhMDM4NWMwY2Q3YjE0Iiwia2V5Y29kZSI6InNhZGEifQ%3D%3D
	   // https://qas-hortifrut.DEMOWEB.pe/#/auth/authsignon?uid=eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiI2NjhiOTg4NGJjYmUwODRkMzUzNGQxNTRhZWI0NDhiOGMwMWI5ZjU5YmZkMzE3NjQ2YWRhMDM4NWMwY2Q3YjE0Iiwia2V5Y29kZSI6InNhZGEifQ%3D%3D

		
		var QueryPathString = window.location.href;
		var varindx = QueryPathString.indexOf("?");

        QueryPathString = QueryPathString.substring(varindx, 500);
		var urlParams = new URLSearchParams(QueryPathString);

		var evalUid = urlParams.has('uid'); //returns true 
        var valueUid = urlParams.get('uid'); //returns US

		if( evalUid )
		{
		  var objectAuthdecoded = window.atob(valueUid);
		  var objectAuth = JSON.parse(objectAuthdecoded);

		  this.curUserName = objectAuth['username'];
		  this.curPassword = objectAuth['password'];

        if(this.curUserName != null && this.curUserName != undefined && this.curPassword != null && this.curPassword != undefined )
		{  this.submit_auth(); }


		}
    
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initLoginForm() {
		const initialNotice = `Para acceder ingresa tu <strong>nombre de usuario</strong> y <strong>contraseña</strong>.`;
		this.authNoticeService.setNotice(initialNotice, 'info');
		this.loginForm = this.fb.group({
			usuario: ["", Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(20)])],
			password: ["", Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(20)])]
		});
	}


	submit() {
		
	}

	submit_auth() {
	  
		this.authNoticeService.setNotice(null);
		this.loading = true;
		 

		this.auth.authSignOn(this.curUserName, this.curPassword).toPromise().then(
			token => {

				this.store.dispatch(new Login({ authToken: token.authToken }));

				// this.authFireService.signIn().then((result) => {
				// 	this.authFireService.setUserData(result.user);
				// 	this.loading = false;
				// 	this.cdr.markForCheck();
				// 	this.router.navigateByUrl(this.returnUrl); // Main page
				// }).catch((error) => {
				// 		this.loading = false;
				// 		this.authNoticeService.setNotice(error.message, 'danger');
				// });
		},
		err => {
			console.log(err);
			this.authNoticeService.setNotice(err.error ? err.error.message : err.message, 'danger');
			this.loading = false;
			this.cdr.markForCheck();
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) return false;
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
