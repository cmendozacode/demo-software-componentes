import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppState } from '../../../core/reducers';
import { currentUser, User } from '../../../core/auth';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TYPE_ALERT } from '../../../core/_constantes/constantes';

import { AuthNoticeService, AuthService, Login } from '../../../core/auth';

@Component({
	selector: 'kt-home',
	templateUrl: './home.component.html',
	styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

	viewError: string = "";
	typeAlert: string = "";

	loadpage_flag: boolean = false;


	subscriptions: Subscription[] = [];
	usuario$: Observable<User>;// = this.store.pipe(select(currentUser));
	userLogin: User = undefined;

	constructor(private cd: ChangeDetectorRef,private auth: AuthService,private store: Store<AppState>) {}

	ngOnInit(): void {
		  
	}

	ngAfterViewInit(): void {  
        var curUserData_txt = localStorage.getItem("sd_user_data");
		var curUserData_obj = null;

		if( curUserData_txt != null && curUserData_txt != undefined && curUserData_txt !='undefined'){ curUserData_obj = JSON.parse(curUserData_txt); }
		if (curUserData_obj) {
			this.userLogin = curUserData_obj;
		} else {
			this.showError("No se pudo obtener la sesión del usuario, por favor contactarse con el área de TI de YAPU SOLUTIONS S.A.C.");
		}
		
		//#Consulta Programas y Menu
		this.cd.detectChanges();
	     
/* //OLD PROGRAM
		this.subscriptions.push(this.usuario$.subscribe(user => { console.log('after init');console.log(user);
			if (user) {
				this.userLogin = user;
			} else {
				this.showError("No se pudo obtener la sesión del usuario, por favor contactarse con el área de TI de YAPU SOLUTIONS S.A.C.");
			}
		}));
*/


	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

	showError(message: string) {
		this.viewError = message;
		this.typeAlert = TYPE_ALERT.DANGER;
	}

	showWarning(message: string) {
		this.viewError = message;
		this.typeAlert = TYPE_ALERT.WARNING;
	}
}
