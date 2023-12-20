import { AccesoModel } from './acceso.model';

export class PerfilModel {
    perfilID:number;
    perfilDescripcion:string;
    perfilWebMovil?:boolean;
    perfilStatus?:boolean;
    perfilDisabled?:boolean;
    perfilDetalleAccesos?:AccesoModel[];
    login?:string;

    clear() {
        this.perfilID = 0;
        this.perfilDescripcion = "";
        this.login="";
        this.perfilWebMovil = true;
        this.perfilStatus = true;
        this.perfilDisabled = false;
        this.perfilDetalleAccesos = [];
    }
}