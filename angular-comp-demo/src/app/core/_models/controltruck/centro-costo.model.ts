export class CentroCostoModel {
	centroCostoID: number;
	empresaID: number;
	empresaNombre: string;
	denominacionCecoID: number;
	denominacionCecoNombre: string;
	centroCostoCodigo: string;
	centroCostoNombre: string;
	centroCostoOrdenEstadistica: string;

	clear() {
		this.centroCostoID = 0;
		this.empresaID = 0;
		this.empresaNombre = "";
		this.denominacionCecoID = 0;
		this.denominacionCecoNombre = "";
		this.centroCostoCodigo = "";
		this.centroCostoNombre = "";
		this.centroCostoOrdenEstadistica = "";
	}
}
