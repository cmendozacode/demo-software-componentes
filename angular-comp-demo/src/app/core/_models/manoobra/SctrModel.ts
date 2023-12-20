export class SctrModel {
	index?: number;
	trabajadorPeriodoID?: number;
	nombreTrabajador?: string;
	legajoTrabajador?: string;

	periodoID?: number;
	periodoCodigo?: string;
	fechaIni?: string;
	fechaFin?: string;

	clear() {
		this.trabajadorPeriodoID = -1;
		this.nombreTrabajador = '';
		this.legajoTrabajador = '';
		this.periodoID = -1;
		this.periodoCodigo = '';
		this.fechaIni = '';
		this.fechaFin = '';
	}
}
