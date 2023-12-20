export class PlanillaModel {
    planillaID:number;
    empresaID:number;

    aplicaOrden:boolean;
    tipoActividadID:number;

    actividadID:number;
    actividadNombre:string;
    actividadTarea:boolean;

    turnoDiaID:number;
    turnoDiaNombre:string;

    fechaPlanilla:string; 
    supervisorID:number; 

    fundoID:number;
    moduloID:number;

    moduloNombre:string;
    centroCostoID:number;

    centroCostoNombre:string;
    ordenInversionID:number;

    LineaNombre: string;
    lineaID: number;

    ordenInversionNombre:string;
    fechaHoraInicio:string;
    fechaHoraFin:string;

    legajosPlanilla:String;
    estadoPlanilla:number;
    transferPlanilla:number;
    objServicioTerceros:object;

    userName:String;
    hostName:String;

    clear() {
        this.planillaID=-1;
        this.empresaID=-1;
        this.aplicaOrden=false;
        this.tipoActividadID=22;
        this.actividadID=-1;
        this.actividadTarea=false;
        this.turnoDiaID=-1;
        this.supervisorID=-1; 

        this.fundoID=-1;
        this.moduloID=-1;

        this.lineaID = -1;
        this.centroCostoID=-1;
        this.ordenInversionID=-1;

        this.estadoPlanilla=1;
        this.transferPlanilla=0;
        this.fechaHoraInicio="";
        this.fechaHoraFin="";
        this.legajosPlanilla="";
        this.objServicioTerceros=undefined;
    }
}