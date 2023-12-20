export class ActividadCecoModel {
cecoactividadID: number;
actividadID: number;
centrocostoID: number;
gerenciaNombre?:string;
areaNombre?: string;
puestoNombre?: string;
actividadCodigo?: string;
actividadNombre?: string;
centrocostoCodigo?: string;
centrocostoNombre?: string;
ordenestadisticaNombre?: string;
estado?: boolean;
login?: string;
errores?:String;
nro?: number;
listCecosId?:[];

	clear() {
	this.cecoactividadID = 0;
	this.actividadID = -1;
	this.centrocostoID = -1;
	this.gerenciaNombre = "-1";
	this.areaNombre = "-1";
	this.puestoNombre = "-1";
	this.actividadCodigo = "";
	this.actividadNombre = "";
	this.centrocostoCodigo = "";
	this.centrocostoNombre = "";
	this.ordenestadisticaNombre = "";
	this.estado = false;
	this.login = "";
	this.listCecosId = [];
	}
}
