export class CultivoModel {
    cultivoID:number;
    cultivoNombre:string;
    cultivoFlagWeb:boolean;
    cultivoFlagMovil:boolean;

    clear() {
        this.cultivoID = 0;
        this.cultivoNombre = "";
        this.cultivoFlagWeb = false;
        this.cultivoFlagMovil = false;
    }
}