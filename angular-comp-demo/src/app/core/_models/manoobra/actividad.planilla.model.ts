export class ActividadPlanillaModel {
    indice:number;
    planillasID:string;
    actividadID:number;
    actividadCodigo:string;
    actividadNombre:string;
    planillas:number;
    trabajadores:number;
    flagEstado:number;
    flagTransferido:number;
    
    clear() {
        this.indice=-1;
        this.planillasID="";
        this.actividadID = -1;
        this.actividadCodigo = "";
        this.actividadNombre = "";
        this.planillas = 0;
        this.trabajadores = 0;
        this.flagEstado = 0;
        this.flagTransferido = 0;
    }
}