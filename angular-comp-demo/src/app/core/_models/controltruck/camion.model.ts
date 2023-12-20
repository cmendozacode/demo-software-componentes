import { CamionTarifaModel } from "./camion-tarifa.model";

export class CamionModel {
	camionID: number;
	proveedorID: number;
	proveedorNombre: string;
	camionPlaca: string;
	camionAnio: number;
	capacidadID: number;
	capacidadNombre: number;
	tipoCamionID: number;
	tipoCamionNombre: string;
	tipoServicioID: number;
	tipoServicioNombre: string;
	fechaVencSOAT: string;
	fechaVencRevTec: string;
	tarjetaCirculacion: string;
	fechaVencInspTec: string;
	condicionID: number;
	condicionNombre: string;
	listaTarifas: CamionTarifaModel[];

	clear() {
		this.camionID = 0;
		this.proveedorID = 0;
		this.proveedorNombre = "";
		this.camionPlaca = "";
		this.camionAnio = null;
		this.capacidadID = 0;
		this.capacidadNombre = 0;
		this.tipoCamionID = 0;
		this.tipoCamionNombre = "";
		this.tipoServicioID = 0;
		this.tipoServicioNombre = "";
		this.fechaVencSOAT = "";
		this.fechaVencRevTec = "";
		this.tarjetaCirculacion = "";
		this.fechaVencInspTec = "";
		this.condicionID = 0;
		this.condicionNombre = "";
		this.listaTarifas = [];
	}
}
