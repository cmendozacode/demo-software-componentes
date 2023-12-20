export class EmpresaCultivoModel {
    cultivoID:number;
    cultivoNombre:string;
    cultivoPesoParihuela:number;
    cultivoCapturaPeso:boolean;
    cultivoCerrarLote:boolean;
    cultivoStickerGrupo:boolean;
    cultivoStickerTrabajador:boolean;

    clear() {
        this.cultivoID = 0;
        this.cultivoNombre = "";
        this.cultivoPesoParihuela=0;
        this.cultivoCapturaPeso=false;
        this.cultivoCerrarLote=false;
        this.cultivoStickerGrupo=false;
        this.cultivoStickerTrabajador=false;
    }
}