export class CharlaDiariaModel {
	nro?: number;
	charlaDiariaID: number;
	idTipo: number;
	nombreTipo: string;
	anio: number;
	semana: number;
	dia: string;
	fecha: string;
	tema: string;
	listaDocumentos: string[];
	idEstado: number;
	nombreEstado: string;
	status?: boolean;
	login?: string;

    clear() {
		this.nro = 0;
		this.charlaDiariaID = 0;
		this.idTipo = 0;
		this.nombreTipo = "";
		this.anio = 0;
		this.semana = 0;
		this.dia = "";
		this.fecha = "";
		this.tema = "";
		this.listaDocumentos = [];
		this.idEstado = 0;
		this.nombreEstado = "";
		this.status = false;
		this.login = "";
    }
}
