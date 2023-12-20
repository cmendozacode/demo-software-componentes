export class ProyeccionModel {
	proyeccionID?: number;
	nro?: number;
	fecha?: string;
	zonaID?: number;
	zonaNombre?: string;
	fundoID?: number;
	fundoNombre?: string;
	moduloID?: number;
	moduloNombre?: string;
	parcelaNombre?: string;
	variedadID?: number;
	variedadNombre?: string;
	caeID?: number;
	caeNombre?: string;
	kg_proy?: number;
	estadoID?: number;
	estadoNombre?: string;
	motivo?: string;
	errores?: string;

	proyeccionDetalleID?: number;
	destinoID?: number;
	destinoNombre?: string;
	formatoID?: number;
	formatoNombre?: string;
	kg_dist?: number;
	pallet?: number;

	proyeccionAjusteID?: number;
	tipo?: number;

    clear() {
		this.proyeccionID = 0;
		this.nro = 0;
		this.fecha = "";
        this.zonaID = 0;
		this.zonaNombre = "";
		this.fundoID = 0;
		this.fundoNombre = "";
		this.moduloID = 0;
		this.moduloNombre = "";
		this.parcelaNombre = "";
		this.variedadID = 0;
		this.variedadNombre = "";
		this.caeID = 0;
		this.caeNombre = "";
		this.kg_proy = 0.00;
		this.estadoID = 0;
		this.estadoNombre = "";
		this.motivo = "";
		this.errores = "";

		this.proyeccionDetalleID = 0;
		this.destinoID = 0;
		this.destinoNombre = "";
		this.formatoID = 0;
		this.formatoNombre = "";
		this.kg_dist = 0.00;
		this.pallet = 0;

		this.proyeccionAjusteID = 0;
		this.tipo = 0;
	}

	public static ESTADO_0(): string {
		return "ELIMINADO";
	}

	public static ESTADO_1(): string {
		return "NO REGISTRADO";
	}

	public static ESTADO_2(): string {
		return "REGISTRADO";
	}

	public static ESTADO_3(): string {
		return "ENVIADO";
	}

	public static ESTADO_4(): string {
		return "APROBADO";
	}

	public static ESTADO_5(): string {
		return "RECHAZADO";
	}
}
