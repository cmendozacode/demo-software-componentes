export class AccesoModel {
    accesoID:number;
    accesoDescripcion:string;
    accesoTag:string;
    accesoPadreID:number;
    accesoWebMovil:boolean;
    moduloID:number;
    moduloDescripcion:string;
    accesoChecked:boolean;

    clear() {
        this.accesoID = 0;
        this.accesoDescripcion = "";
        this.accesoTag = "";
        this.accesoPadreID = 0;
        this.accesoWebMovil = true;
        this.moduloID = 0;
        this.moduloDescripcion = "";
        this.accesoChecked = false;
    }
}