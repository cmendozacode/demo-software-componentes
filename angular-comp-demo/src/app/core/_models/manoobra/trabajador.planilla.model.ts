export class TrabajadorPlanillaModel {
    
    index:number;
    planillaID:number;
    detalleID:number;
    empresaID:number;
    trabajadorID:number; 
    trabajadorLegajo:string;
    trabajadorNombre:string;
    fechaHoraInicio:string;
    fechaHoraFin:string;
    horaInicio:Date;
    horaFin:Date;
    totalHoras:number;
    totalHorasText:string;
    trabajadorEstado:number;
    trabajadorTransferido:number;
    status:boolean;
    userName:string;
    hostName:string;
    _isEditMode: boolean;

    clear(planillaID:number) {
        this.planillaID=planillaID;
        this.empresaID=-1;
        this.trabajadorID=-1;
        this.fechaHoraInicio="";
        this.fechaHoraFin="";
        this.status=true;
        this._isEditMode=false;
    }
}