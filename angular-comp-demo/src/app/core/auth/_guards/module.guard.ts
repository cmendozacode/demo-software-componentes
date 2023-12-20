// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Module reducers and selectors
import { AppState} from '../../../core/reducers/';
import { currentUserPermissions } from '../_selectors/auth.selectors';
import { find } from 'lodash';
import { AccesoModel } from '../_models/acceso.model';

@Injectable()
export class ModuleGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

        const moduleName = route.data.moduleName as string;
        if (!moduleName) {
            return of(false);
        }

        return this.store
            .pipe(
                select(currentUserPermissions),
                map((permissions: AccesoModel[]) => {
                    const _perm = find(permissions, (elem: AccesoModel) => {
                        return elem.perfilAccesoNombre.toLocaleLowerCase() === moduleName.toLocaleLowerCase();
                    });
                    return _perm ? true : false;
                }),
                tap(hasAccess => {
                    if (!hasAccess) {
                        this.router.navigateByUrl('/error/403');
                    }
                })
            );
    }
}
