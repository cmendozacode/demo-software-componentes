export class TipoDocumentoModel {
    tipoID:number;
    tipoNombre:string;

    clear() {
        this.tipoID = 0;
        this.tipoNombre = "";
    }
}