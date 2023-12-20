export class AgrupadorModel {
    configuracionId:number;
    configuracionNombre:string;
    tipoConfiguracionId?:number;
    tipoConfiguracionNombre?:string;
    cultivoId?:number;
    cantidadCodigos?:number;
    condiguracionIdentificadores:string;
    status:boolean;
    userName?:string;
    hostName?:string;

    clear() {
        this.configuracionId = 0;
        this.configuracionNombre = "";
        this.tipoConfiguracionId=0;
        this.condiguracionIdentificadores="";
        this.userName="";
        this.status = true;
    }
}