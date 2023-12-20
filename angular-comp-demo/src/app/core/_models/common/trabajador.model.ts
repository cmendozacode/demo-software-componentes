export class TrabajadorModel {
    trabajadorID:number;
    trabajadorLegajo:string;
    trabajadorNroDocumento:string;
    trabajadorNombreCompleto:string;
    trabajadorEsOperador:boolean;
    trabajadorEsLavamano:boolean;
    trabajadorCantidad:number;
    trabajadorFechaIngreso:string;
    fechaIngresoGrupo:string;
    trabajadorImpreso:boolean;
    trabajadorImprimir:boolean;
    _isEditMode:boolean;
    registroAusentismo:number;
    nro:number;

		errores:string;

    clear() {
        this.trabajadorID = 0;
        this.trabajadorLegajo = "";
        this.trabajadorNroDocumento = "";
        this.trabajadorNombreCompleto = "";
        this.trabajadorFechaIngreso="";
        this.trabajadorEsOperador = false;
        this.trabajadorEsLavamano = false;
        this.trabajadorCantidad = 1;
        this.trabajadorImpreso = false;
        this.trabajadorImprimir = false;
        this._isEditMode = false;
        this.registroAusentismo=0;
        this.nro=1;

				this.errores = '';
    }
}
