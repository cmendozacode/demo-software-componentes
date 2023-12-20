export class ActividadModel {
	actividadID: number;
	empresaID: number;
	empresaNombre: string;
	actividadCodigo: string;
	actividadNombre: string;

	clear() {
		this.actividadID = 0;
		this.empresaID = -1;
		this.empresaNombre = "";
		this.actividadCodigo = "";
		this.actividadNombre = "";
	}
}
