import { Action } from '@ngrx/store';
import { User } from '../_models/user.model';
import { EmpresaModel } from '../../_models/cosecha/empresa.model';
import { EmpresaCultivoModel } from '../../_models/cosecha/empresa.cultivo.model';

export enum AuthActionTypes {
    Login = '[Login] Action',
    SignOn = '[SignOn] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API',
    UserEmpresa = '[Empresa User] Action',
    CultivoEmpresa = '[Cultivo Empresa] Action',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authToken: string }) { }
}

export class SignOn implements Action {
    readonly type = AuthActionTypes.SignOn;
    constructor(public payload: { authToken: string }) { }
}


export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { authToken: string }) { }
}


export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
}

export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: User }) { }
}

export class UserEmpresa implements Action {
    readonly type = AuthActionTypes.UserEmpresa;
    constructor(public payload: { empresa: EmpresaModel }) { }
}

export class CultivoEmpresa implements Action {
    readonly type = AuthActionTypes.CultivoEmpresa;
    constructor(public payload: { cultivoEmpresa: EmpresaCultivoModel }) { }
}

export type AuthActions = Login | SignOn| Logout | Register | UserRequested | UserLoaded | UserEmpresa | CultivoEmpresa;
