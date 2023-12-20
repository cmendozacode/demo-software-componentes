// NGRX
import { createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// Models
import { PerfilModel } from '../_models/perfil.model';
import { AccesoModel } from '../_models/acceso.model';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);

export const currentAuthToken = createSelector(
    selectAuthState,
    auth => auth.authToken
);

export const isUserLoaded = createSelector(
    selectAuthState,
    auth => auth.isUserLoaded
);

export const currentUser = createSelector(
    selectAuthState,
    auth => auth.user
);

export const currentEmpresa = createSelector(
    selectAuthState,
    auth => auth.empresa
);


export const currentCultivo = createSelector(
    selectAuthState,
    auth => auth.cultivoEmpresa
);

export const currentUserPerfiles = createSelector(
    currentUser,
    user => {
        if (!user) {return [];}
        return user.usuarioWebPerfiles;
    }
);

export const currentUserPermissions = createSelector(
    currentUserPerfiles,
    (allPerfiles: PerfilModel[]) => {
        const result: AccesoModel[] = [];
        each(allPerfiles, perfilItem => {
            each(perfilItem.perfilAccesos, acceso=>{
                result.push(acceso);
            });
        });
        return result;
    }
);