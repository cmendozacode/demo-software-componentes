export class ConfiguradorCecoModel {
	configuradorCecoID: number;
	empresaID: number;
	empresaNombre: string;
	actividadID: number;
	actividadNombre: string;
	areaID: number;
	areaNombre: string;
	ubigeoID: number;
	ubigeoNombre: string;
	centroCostoID: number;
	centroCostoCodigo: string;
	centroCostoNombre: string;
	denominacionCecoNombre: string;
	centroCostoOrdenManual: boolean;

	clear() {
		this.configuradorCecoID = 0;
		this.empresaID = 0;
		this.empresaNombre = "";
		this.actividadID = 0;
		this.actividadNombre = "";
		this.areaID = 0;
		this.areaNombre = "";
		this.ubigeoID = 0;
		this.ubigeoNombre = "";
		this.centroCostoID = 0;
		this.centroCostoCodigo = "";
		this.centroCostoNombre = "";
		this.denominacionCecoNombre = "";
		this.centroCostoOrdenManual = false;
	}
}
