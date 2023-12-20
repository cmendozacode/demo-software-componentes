export class UbigeoModel {
	ubigeoID: number;
	empresaID: number;
	empresaNombre: string;
	ubigeoCodigo: string;
	ubigeoNombre: string;

	clear() {
		this.ubigeoID = 0;
		this.empresaID = 0;
		this.empresaNombre = "";
		this.ubigeoCodigo = "";
		this.ubigeoNombre = "";
	}
}
