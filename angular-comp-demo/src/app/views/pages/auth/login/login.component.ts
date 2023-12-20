import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { AppState } from '../../../../core/reducers';
import { Observable, Subject } from 'rxjs';
// import { FirestoreAuthService } from '../../../../core/_services';

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	loading: boolean = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	error_auth_flag:boolean=false;

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
		this.error_auth_flag = false;
		const controls = this.loginForm.controls;
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
			return;
		}
		this.authNoticeService.setNotice(null);
		this.loading = true;
		const authData = { usuario: controls.usuario.value, password: controls.password.value };

		this.auth.login(authData.usuario, authData.password).toPromise().then(
			token => {

				
				console.log('Response Login');
				console.log(token); console.log(this.returnUrl);

				if(token['auth_status'] == true){
				  this.error_auth_flag = false;
				  //this.store.dispatch(new Login({ authToken: token.authToken }));
				  this.store.dispatch(new Login({ authToken: token.token_session }));

				// this.authFireService.signIn().then((result) => {
				// 	this.authFireService.setUserData(result.user);
					this.loading = false;
					this.cdr.markForCheck();
					this.router.navigateByUrl(this.returnUrl); // Main page
				// }).catch((error) => {
				// 		this.loading = false;
				// 		this.authNoticeService.setNotice(error.message, 'danger');
				// });
				    this.cdr.detectChanges();
			    }
				else
				{   this.error_auth_flag = true;
					this.loading = false;
					this.cdr.detectChanges();
				}
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
