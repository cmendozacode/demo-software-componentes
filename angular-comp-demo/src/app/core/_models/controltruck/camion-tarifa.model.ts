export class CamionTarifaModel {
	tarifaID: number;
	camionID: number;
	tarifaNombre: string;
	tarifaHoras: number;
	tarifaPrecio: number;

	clear() {
		this.tarifaID = 0;
		this.camionID = 0;
		this.tarifaNombre = "";
		this.tarifaHoras = 0;
		this.tarifaPrecio = 0;
	}
}
