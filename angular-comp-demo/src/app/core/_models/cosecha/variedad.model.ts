export class VariedadModel {
    variedadID:number;
    cultivoID:number;
    cultivoNombre:string;
    variedadNombre:string;
    variedadFlagWeb:boolean;
    variedadFlagMovil:boolean;

    clear() {
        this.variedadID = 0;
        this.cultivoID = 0;
        this.cultivoNombre = "";
        this.variedadNombre = "";
        this.variedadFlagWeb = false;
        this.variedadFlagMovil = false;
    }
}