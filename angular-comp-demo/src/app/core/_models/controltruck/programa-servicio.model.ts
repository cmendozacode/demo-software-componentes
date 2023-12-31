export class ProgramaServicioModel {
	programaServicioID: number;
	solicitudServicioID: number;
	programacionFecha: string;
	empresaID: number;
	empresaNombre: string;
	actividadID: number;
	actividadNombre: string;
	areaID: number;
	areaNombre: string;
	ubigeoID: number;
	ubigeoNombre: string;
	centroCostoID: number;
	centroCostoCodigo: string;
	centroCostoOrdenEstadistica?: string;
	tipoCamionID: number;
	tipoCamionNombre: string;
	capacidadID: number;
	capacidadNombre: string;
	cantidad: number;
	cantidadProgramada: number;
	semanasIDs: string;
	semanasDesc: string;
	diasProgramados: string;
	diasProgramadosDesc: string;
	horaInicio: string;
	plannerID: number;
	plannerNombre: string;
	comentario: string;
	estado: number;
	estadoNombre: string;
	jsonDetalles: string;

	clear() {
		this.programaServicioID = 0;
		this.solicitudServicioID = 0;
		this.programacionFecha = "";
		this.empresaID = 0;
		this.empresaNombre = "";
		this.actividadID = 0;
		this.actividadNombre = "";
		this.areaID = 0;
		this.areaNombre = "";
		this.ubigeoID = 0;
		this.ubigeoNombre = "";
		this.centroCostoID = 0;
		this.centroCostoCodigo = "";
		this.centroCostoOrdenEstadistica = "";
		this.tipoCamionID = 0;
		this.tipoCamionNombre = "";
		this.capacidadID = 0;
		this.capacidadNombre = "";
		this.cantidad = 0;
		this.cantidadProgramada = 0;
		this.semanasIDs = "";
		this.semanasDesc = "";
		this.diasProgramados = "";
		this.diasProgramadosDesc = "";
		this.horaInicio = "07:00";
		this.plannerID = 0;
		this.plannerNombre = "";
		this.comentario = "";
		this.estado = 0;
		this.estadoNombre = "";
		this.jsonDetalles = "";
	}
}
