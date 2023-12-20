export class MarcaVehiculoModel {
    marcaID:number;
    marcaNombre:string;

    clear() {
        this.marcaID = 0;
        this.marcaNombre = "";
    }
}