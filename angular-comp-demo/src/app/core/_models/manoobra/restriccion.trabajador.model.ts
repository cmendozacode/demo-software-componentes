
export class RestriccionTrabajadorModel {

    restriccionTrabajadorID: number;
    empresaID: number;
    planillaID: number;
    trabajadorID: number;
    trabajadorCodigo: string;
    trabajadorNombres: string;

    duracion: string;
    fechaIni: string;
    fechaFin: string;

    nroDias:number;
    flagHabilitado: boolean;
    observacion: string;

    clear(){

        this.restriccionTrabajadorID = -1;
        this.empresaID = -1;
        this.planillaID = -1;
        this.trabajadorID = -1;
        this.trabajadorCodigo = '';
        this.trabajadorNombres = '';

        this.duracion = '';
        this.fechaIni = '';
        this.fechaFin = '';

        this.nroDias = 0;
        this.observacion = '';
        this.flagHabilitado = false;
    }
}
