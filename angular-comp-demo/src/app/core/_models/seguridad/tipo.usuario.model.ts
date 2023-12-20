export class TipoUsuarioModel {
    usuarioTipoID:number;
    usuarioTipoNombre:string;

    clear() {
        this.usuarioTipoID = 0;
        this.usuarioTipoNombre = "";
    }
}