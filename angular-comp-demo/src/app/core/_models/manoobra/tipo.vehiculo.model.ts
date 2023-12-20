export class TipoVehiculoModel {
    tipoID:number;
    tipoNombre:string;

    clear() {
        this.tipoID = 0;
        this.tipoNombre = "";
    }
}