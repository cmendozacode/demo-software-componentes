export class ProduccionFirestoreModel 
{
    _id:string;
    bandejaId:number;
    bandejaNombre:string;
    cantidad:number;
    cosechadores:string[];
    cultivoId:number;
    cultivoNombre:string;
    empresaId:number;
    empresaNombre:string;
    fechaRegistro:number;
    fundoArea:number;
    fundoId: number;
    fundoNombre:string;
    grupoCodigo:string;
    grupoId:number;
    kilos:number;
    loteArea:number;
    loteId:number;    
    loteNombre:string;
    moduloArea:number;
    moduloId:number;
    moduloNombre:string;
    moduloZona:number;
    supervisorId:number;
    supervisorLegajo:string;
    supervisorNombre:string;
    tipoCosecha:number;
    turnoArea:number;
    turnoId:number;
    turnoNombre:string;
    variedadId:number;
    variedadNombre:string;

    clear() 
    {
        this._id = "";
    }
}