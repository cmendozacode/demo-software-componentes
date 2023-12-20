export class ProgramaServicioDiaModel {
	programaServicioTiempoID: number;
	programaServicioDiaID: number;
	programaServicioID: number;
	programaServicioDetalleID: number;
	programaServicioCorrelativo: string;
	diaID: number;
	programaServicioFecha: string;
	semanaID: number;
	semanaNombre: string;
	diaNro: number;
	diaNombre: string;
	empresaID: number;
	empresaNombre: string;
	areaID: number;
	areaNombre: string;
	actividadID: number;
	actividadNombre: string;
	ubigeoID: number;
	ubigeoNombre: string;
	centroCostoID: number;
	centroCostoCodigo: string;
	denominacionCecoNombre?: string;
	centroCostoOrdenEstadistica?: string;
	tipoCamionID: number;
	tipoCamionNombre: string;
	capacidadID: number;
	capacidadNombre: string;
	tipoServicioID: number;
	tipoServicioNombre: string;
	proveedorID: number;
	proveedorNombre: string;
	camionID: number;
	camionPlaca: string;
	conductorID: number;
	conductorNombre: string;
	tarifaID: number;
	tarifaNombre: string;
	tarifaMonto: number;
	programaServicioHrProg: string;
	programaServicioHrIni: string;
	programaServicioHrFin: string;
	programaServicioHrTot: number;
	programaServicioKmIni: number;
	programaServicioKmFin: number;
	programaServicioKmTot: number;
	programaServicioComentario: string;
	programaServicioObservacion: string;
	confirmacionID: number;
	confirmacionNombre: string;
	motivoID: number;
	motivoNombre: string;
	motivoDescripcion: string;
	programaServicioFinalizado: string;
	programaServicioLiquidado: string;
	estadoID: number;
	estadoNombre: string;

	clear() {
		this.programaServicioTiempoID = 0;
		this.programaServicioDiaID = 0;
		this.programaServicioID = 0;
		this.programaServicioDetalleID = 0;
		this.programaServicioCorrelativo = "";
		this.diaID = 0;
		this.programaServicioFecha = "";
		this.semanaID = 0;
		this.semanaNombre = "";
		this.diaNro = 0;
		this.diaNombre = "";
		this.empresaID = 0;
		this.empresaNombre = "";
		this.areaID = 0;
		this.areaNombre = "";
		this.actividadID = 0;
		this.actividadNombre = "";
		this.ubigeoID = 0;
		this.ubigeoNombre = "";
		this.centroCostoID = 0;
		this.centroCostoCodigo = "";
		this.denominacionCecoNombre = "";
		this.centroCostoOrdenEstadistica = "";
		this.tipoCamionID = 0;
		this.tipoCamionNombre = "";
		this.capacidadID = 0;
		this.capacidadNombre = "";
		this.tipoServicioID = 0;
		this.tipoServicioNombre = "";
		this.proveedorID = 0;
		this.proveedorNombre = "";
		this.camionID = 0;
		this.camionPlaca = "";
		this.conductorID = 0;
		this.conductorNombre = "";
		this.tarifaID = 0;
		this.tarifaNombre = "";
		this.tarifaMonto = 0.00;
		this.programaServicioHrProg = "07:00";
		this.programaServicioHrIni = "07:00";
		this.programaServicioHrFin = "07:00";
		this.programaServicioHrTot = 0.00;
		this.programaServicioKmIni = 0.00;
		this.programaServicioKmFin = 0.00;
		this.programaServicioKmTot = 0.00;
		this.programaServicioComentario = "";
		this.programaServicioObservacion = "";
		this.confirmacionID = -1;
		this.confirmacionNombre = "";
		this.motivoID = -1;
		this.motivoNombre = "";
		this.motivoDescripcion = "";
		this.programaServicioFinalizado = "";
		this.programaServicioLiquidado = "";
		this.estadoID = -1;
		this.estadoNombre = "";
	}
}