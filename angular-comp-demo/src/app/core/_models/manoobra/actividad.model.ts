export class ActividadModel {
    actividadID: number;
	grupoActividadID: number;
	grupoActividadNombre: string;
	actividadCodigo: string;
	actividadNombre: string;
	tipoActividadID: number;
	tipoActividadNombre: string;
	actividadBono: boolean; 
	actividadRiesgo: boolean;
	actividadCualitativa: boolean;
    centroCostoID: number;
    centroCostoDescripcion: string;
	status: boolean;
    actividadUsuario : string;
    actividadIDRptaServidor : number;
    actividadMsgServidor : string;

	clear () {
		this.actividadID = -1;
		this.grupoActividadID = -1;
		this.grupoActividadNombre = '';
		this.actividadCodigo = '';
		this.actividadNombre = '';
		this.tipoActividadID = 23;
		this.tipoActividadNombre = '';
        this.actividadBono = false;
        this.actividadRiesgo = false;
        this.actividadCualitativa = false;
        this.centroCostoID = -1;
        this.centroCostoDescripcion = '';
		this.status = true;
		this.actividadUsuario= "jdavalos";
	}
}
