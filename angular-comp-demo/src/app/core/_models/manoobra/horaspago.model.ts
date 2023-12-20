export class HorasPagoModel {
	horasPagoID: number;
	fechaPago: string;
	limiteHoras: number;
	zonaHoras: number;
	estado?: boolean;
	login?: string;

	clear() {
	this.horasPagoID = 0;
	this.zonaHoras = -1;
	this.fechaPago = "";
	this.limiteHoras = 0;
	this.estado = false;
	this.login = "";
	}
}
