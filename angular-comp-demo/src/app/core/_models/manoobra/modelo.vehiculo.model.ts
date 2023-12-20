export class ModeloVehiculoModel {
    modeloID:number;
    modeloNombre:string;

    clear() {
        this.modeloID = 0;
        this.modeloNombre = "";
    }
}