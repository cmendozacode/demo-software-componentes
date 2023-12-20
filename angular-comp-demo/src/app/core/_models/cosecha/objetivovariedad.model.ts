export class ObjetivoVariedadModel {
	frecuenciaObjetivoID: number;
cultivoID: number;
variedadID: number;
areaCampo:number;
frecuenciaObjetivo: number;
toleranciaExport : number;
fechaInicioVigencia: string;
fechaFinVigencia?: string;
estado?: boolean;
login?: string;

	clear() {
	this.frecuenciaObjetivoID = 0;
	this.cultivoID = 0;
	this.variedadID = 0;
	this.areaCampo = 0.00;
	this.toleranciaExport = 0.00;
	this.frecuenciaObjetivo = 0.00;
	this.fechaInicioVigencia = "";
	this.fechaFinVigencia = "";
	this.estado = false;
	this.login = "";
	}
}
