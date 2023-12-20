import { EmpresaCultivoModel } from './empresa.cultivo.model';

export class EmpresaModel {
    empresaID: number;
    empresaCodigoERP: string;
    empresaNombreCorto: string;
    empresaRazonSocial: string;
    empresaRUC: string;
    empresaDireccion: string;
    empresaImagen: string;
    empresaColorFondo: string;
    empresaSelect: boolean;
    empresaCultivos: EmpresaCultivoModel[];
    empresaStatus: boolean;
    empresaUsuario: string;

    clear() {
        this.empresaID=-1;
        this.empresaCodigoERP="";
        this.empresaNombreCorto="";
        this.empresaRazonSocial="";
        this.empresaRUC="";
        this.empresaDireccion="";
        this.empresaImagen="";
        this.empresaColorFondo="";
        this.empresaSelect=false;
        this.empresaCultivos=[];
        this.empresaStatus=true;
        this.empresaUsuario="";
    }
}
