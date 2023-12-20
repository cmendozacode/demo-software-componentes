export class AcopioModel {
    acopioID:number;
    empresaID:number;
    empresaNombre:string;
    acopioNombre:string;
    acopioDescripcion:string;

    clear() {
        this.acopioID = 0;
        this.empresaID = 0;
        this.empresaNombre = "";
        this.acopioNombre = "";
        this.acopioDescripcion="";
    }
}