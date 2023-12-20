export class NotificacionUsuarioFrutaModel {
    notificacionUsuarioFrutaID:number;
    usuarioMovilID:number;
    usuarioMovilLogin:string;
    usuarioMovilFullName:string;
    flagNivel1:boolean;
    flagNivel2:boolean;
    flagNivel3:boolean;

    clear(){
        this.notificacionUsuarioFrutaID = 0
        this.usuarioMovilID = 0
        this.flagNivel1 = false
        this.flagNivel2 = false
        this.flagNivel3 = false
    }
}