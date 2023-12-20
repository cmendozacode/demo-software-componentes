export class VehiculoModel {
    vehiculoID:number;
    marcaID:number;
    marcaNombre:string;
    modeloID:number;
    modeloNombre:string;
    tipoID:number;
    tipoNombre:string;
    vehiculoPlaca:string;
    vehiculoCodeQR:string;
    vehiculoCapBandejas:number;
    vehiculoCapKilos:number;
    vehiculoCodeERP:number;
    vehiculoUsuario:string;
    vehiculoComedorGO:boolean;
    empresaID:number;
    conductorID:number;
    conductorNombre:string;
    vehiculoTransportista:string;

    jsonTarifas: string;

    clear() {
        this.vehiculoID = 0;
        this.empresaID=0;
        this.marcaID = 0;
        this.marcaNombre = "";
        this.modeloID = 0;
        this.modeloNombre = "";
        this.tipoID = 0;
        this.tipoNombre = "";
        this.vehiculoPlaca = "";
        this.vehiculoCodeQR = "";
        this.vehiculoCapBandejas = null;
        this.vehiculoCapKilos = null;
        this.vehiculoCodeERP = 0;
        this.vehiculoComedorGO=false;
        this.conductorID = 0;
        this.conductorNombre = "";
        this.vehiculoTransportista = "";

        this.jsonTarifas = '';
    }
}