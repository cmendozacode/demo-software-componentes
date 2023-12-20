// Actions
import { AuthActions, AuthActionTypes} from '../_actions/auth.actions';
// Models
import { User } from '../_models/user.model';
import { EmpresaModel } from '../../_models/cosecha/empresa.model';
import { EmpresaCultivoModel } from '../../_models/cosecha/empresa.cultivo.model';

export interface AuthState {
    loggedIn: boolean;
    authToken: string;
    user: User;
    empresa: EmpresaModel;
    cultivoEmpresa : EmpresaCultivoModel;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: undefined,
    user: undefined,
    empresa: undefined,
    cultivoEmpresa:undefined,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                authToken: _token,
                user: undefined,
                empresa: undefined,
                cultivoEmpresa: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Register: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                authToken: _token,
                user: undefined,
                empresa: undefined,
                cultivoEmpresa:undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true
            };
        }

        case AuthActionTypes.UserEmpresa: {
            const _empresa: EmpresaModel = action.payload.empresa;
            return {
                ...state,
                empresa: _empresa,
                cultivoEmpresa:_empresa.empresaCultivos[0]
            };
        }

        case AuthActionTypes.CultivoEmpresa: {
            const _cultivo: EmpresaCultivoModel = action.payload.cultivoEmpresa;
            return {
                ...state,
                cultivoEmpresa: _cultivo
            };
        }

        default:
            return state;
    }
}
