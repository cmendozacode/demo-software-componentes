export class DenominacionCecoModel {
	denominacionCecoID: number;
	empresaID: number;
	empresaNombre: string;
	denominacionCecoNombre: string;

	clear() {
		this.denominacionCecoID = 0;
		this.empresaID = 0;
		this.empresaNombre = "";
		this.denominacionCecoNombre = "";
	}
}
