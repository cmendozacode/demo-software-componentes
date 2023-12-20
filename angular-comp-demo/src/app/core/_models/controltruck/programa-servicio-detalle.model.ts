export class ProgramaServicioDetalleModel {
	programaServicioDetalleID: number;
	programaServicioID: number;
	codigo: string;
	tipoServicioID: number;
	tipoServicioNombre: string;
	proveedorID: number;
	proveedorNombre: string;
	camionID: number;
	camionPlaca: string;
	conductorID: number;
	conductorNombres: string;
	semanaID: number;
	semanaNombre: string;
	diasProgramados: string;
	diasProgramadosDesc: string;
	comentario: string;
	horaInicio: string;
	status: boolean;

	clear() {
		this.programaServicioDetalleID = 0;
		this.programaServicioID = 0;
		this.codigo = "";
		this.tipoServicioID = 0;
		this.tipoServicioNombre = "";
		this.proveedorID = 0;
		this.proveedorNombre = "";
		this.camionID = 0;
		this.camionPlaca = "";
		this.conductorID = 0;
		this.conductorNombres = "";
		this.semanaID = 0;
		this.semanaNombre = "";
		this.diasProgramados = "";
		this.diasProgramadosDesc = "";
		this.comentario = "";
		this.status = true;
	}
}
