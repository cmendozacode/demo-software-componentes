export class EstadoModel {
    estadoID:number;
    estadoDescripcion:string;

    clear() {
        this.estadoID = 0;
        this.estadoDescripcion = "";
    }
}