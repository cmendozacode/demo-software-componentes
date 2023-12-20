import { TrabajadorModel } from '../common/trabajador.model';

export class GrupoCosechaModel {
    grupoCosechaID:number;
    empresaID?:number;
    empresaNombre?:string;
    zonaProcedenciaID:number;
    zonaProcedenciaNombre?:string;
    grupoCosechaCodigo?:string;
    grupoCosechaDescripcion:string;
    grupoCosechaCantidad:number;
    grupoCosechaCantidadProy:number;
    supervisorID?:number;
    supervisorLegajo:string;
    supervisorNombreCompleto?:string;
    grupoCosechaDetalle?:TrabajadorModel[];
    grupoLabores:boolean;
    grupoForaneo: boolean;
    zonaProcedenciaIDPersonal?:number;
    login:string;
		tipoGrupo: boolean;

    clear() {
        this.grupoCosechaID = 0;
        this.empresaID = 0;
        this.empresaNombre = "";
        this.zonaProcedenciaID = 0;
        this.zonaProcedenciaNombre = "";
        this.grupoCosechaCodigo = "";
        this.grupoCosechaDescripcion = "";
        this.grupoCosechaCantidad = 0;
        this.grupoCosechaCantidadProy = 0;
        this.supervisorID = 0;
        this.grupoLabores=false;
        this.grupoForaneo = false;
        this.supervisorLegajo = "";
        this.supervisorNombreCompleto = "";
        this.grupoCosechaDetalle = [];
				this.tipoGrupo = false;

        this.zonaProcedenciaIDPersonal = 0;
        this.login = "";
    }
}
