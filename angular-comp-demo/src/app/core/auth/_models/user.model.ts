import { BaseModel } from '../../_base/crud';
import { EmpresaModel } from '../../_models/cosecha/empresa.model';
import { PerfilModel } from './perfil.model';

export class User extends BaseModel {
    usuarioID: number;
    usuarioWebID: number;
    usuarioIDReferencia: number;
    usuarioCodigo: string;
    usuarioTipoID: number;
    usuarioTipoNombre: string;
    usuarioWebLogin: string;
    usuarioWebPassword: string;
    usuarioNombre: string;
    usuarioApellidoPat: string;
    usuarioApellidoMat: string;
    usuarioNombreCompleto: string;
    usuarioDNI: string;
    usuarioDireccion:string;
    usuarioCorreo: string;
    usuarioPicture: string;
    usuarioStatus: boolean;
    usuarioWebStatus: boolean;
    usuarioEmpresas: EmpresaModel[];
    usuarioWebPerfiles: PerfilModel[];
    mensajeRpta: string;
    
    clear(): void {
        this.usuarioID = -1;
        this.usuarioWebID = -1;
        this.usuarioIDReferencia=-1;
        this.usuarioCodigo = '';
        this.usuarioTipoNombre = '';
        this.usuarioWebLogin = '';
        this.usuarioNombre = '';
        this.usuarioApellidoPat = '';
        this.usuarioApellidoMat = '';
        this.usuarioNombreCompleto = '';
        this.usuarioEmpresas = [];
        this.usuarioWebPerfiles = [];
        this.usuarioPicture = './assets/media/users/default.jpg';
        this.usuarioDireccion = '';
        this.usuarioCorreo = '';
    }
}
