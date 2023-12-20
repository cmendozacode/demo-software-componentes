// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login,SignOn, Logout, Register, UserLoaded, 
    UserRequested, UserEmpresa, CultivoEmpresa } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';

@Injectable()
export class AuthEffects {
    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);

            //Load Data User
            var userObject_txt =  localStorage.getItem("sd_user_data");
            if(userObject_txt != null && userObject_txt != undefined && userObject_txt != 'undefined' && userObject_txt != '')
            {
                var userObject = JSON.parse(userObject_txt);

                this.store.dispatch(new UserLoaded({ user: userObject }));

                var objEmpresa = {};

                var lsizeEmpresa = Object.keys(userObject['usuarioEmpresas']).length;

                if(lsizeEmpresa>0)
                {
                    objEmpresa =   userObject['usuarioEmpresas'][0];
                    
                    localStorage.setItem(environment.empresa, objEmpresa['empresaID'].toString());
                    this.store.dispatch(new UserEmpresa({empresa: userObject['usuarioEmpresas'][0]}));
                }
                
               // this.store.dispatch(new CultivoEmpresa({cultivoEmpresa: userObject.usuarioEmpresas.filter(item=>item.empresaSelect)[0].empresaCultivos[0]}));
                

            }
            else
            {
                this.store.dispatch(new Logout());
            }

           //this.store.dispatch(new UserRequested());
        }),
    );


    @Effect({dispatch: false})
    signon$ = this.actions$.pipe(
        ofType<SignOn>(AuthActionTypes.SignOn),
        tap(action => {      console.log('DATOS SIGN ON 111');
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            this.store.dispatch(new UserRequested());
        }),
    );


    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.authTokenKey);
			this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});
        })
    );

    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);
        })
    );

    @Effect({dispatch: false})
    loadUser$ = this.actions$.pipe(
        ofType<UserRequested>(AuthActionTypes.UserRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
        tap(_user => {    console.log('DATOS SIGN ON  222');
            if (_user) {
                if(_user.usuarioEmpresas.filter(item=>item.empresaSelect).length>0){
                    localStorage.setItem(environment.empresa,_user.usuarioEmpresas.filter(item=>item.empresaSelect)[0].empresaID.toString());
                    this.store.dispatch(new UserEmpresa({empresa: _user.usuarioEmpresas.filter(item=>item.empresaSelect)[0]}));
                    this.store.dispatch(new CultivoEmpresa({cultivoEmpresa: _user.usuarioEmpresas.filter(item=>item.empresaSelect)[0].empresaCultivos[0]}));
                    this.store.dispatch(new UserLoaded({ user: _user }));
                }else{
                    this.store.dispatch(new Logout());
                }
            } else {
                this.store.dispatch(new Logout());
            }
        },error=>{
            this.store.dispatch(new Logout());
        })
    ); 
    
    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({  authToken: userToken }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,private router: Router,private auth: AuthService,private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}
