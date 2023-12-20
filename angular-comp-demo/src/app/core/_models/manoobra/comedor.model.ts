export class ComedorModel {
    comedorID:number;
    empresaID:number;
    empresaNombre:string;
    comedorNombre:string;
    comedorQR:string;
    comedorNumero:number;
    comedorCapacidad:number;
    comedorDireccionRuta:string;
    comedorObservacion:string;
    fundoID:number;
    moduloID:number;
    comedorLatitud:number;
    comedorLongitud:number;
    comedorRutaImagen:string;
    comedorImageBase64:string;
    comedorUsuario:String;
    
    clear() {
        this.comedorID = 0;
        this.empresaID = 0;
        this.empresaNombre = "";
        this.comedorNombre = "";
        this.comedorQR="";
        this.comedorNumero = null;
        this.comedorCapacidad = null;
        this.comedorDireccionRuta = "";
        this.comedorObservacion = "";
        this.fundoID = 0;
        this.moduloID = 0;
        this.comedorLatitud = 0.0;
        this.comedorLongitud = 0.0;
        this.comedorRutaImagen = "";
        this.comedorImageBase64 = "";
    }
}