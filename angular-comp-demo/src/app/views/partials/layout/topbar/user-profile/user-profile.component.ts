// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User, UserEmpresa , currentEmpresa } from '../../../../../core/auth';
import { EmpresaModel } from '../../../../../core/_models/cosecha/empresa.model';
// import { FirestoreAuthService } from '../../../../../core/_services';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;
	empresa$: Observable<EmpresaModel>;
	
	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	constructor(private store: Store<AppState>, /*private authFirestoreService: FirestoreAuthService*/) {}

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		this.empresa$=this.store.pipe(select(currentEmpresa));
	}

	selectEmpresa(empresa:EmpresaModel) {
		this.store.dispatch(new UserEmpresa({empresa: empresa}));
	}

	logout() {
		// this.authFirestoreService.signOut();
		this.store.dispatch(new Logout());
	}
}
