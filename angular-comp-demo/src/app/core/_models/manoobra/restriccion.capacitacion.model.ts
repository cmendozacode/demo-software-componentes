
export class RestriccionCapacitacionModel {

    restriccionCapacitacionID: number;
	gerencia:string;
	area:string;
	puesto:string;
	requisito:string;
	tipo:string;
	sede:string;
	tema:string;
	area_ponente:string;
	observacion: string;
	status: boolean;

	restriccionUsuario:String;

	puestoID: number;
	temaID: number;
	gerenciaID: number;
	areaID: number;
	sedeID: number;
	area_ponenteID: number;

    clear(){

		this.restriccionCapacitacionID = 0;
		this.gerencia = '';
        this.area = '';
        this.puesto = '';
        this.requisito = '';
        this.tipo = '';
        this.sede = '';
        this.tema = '';
        this.area_ponente = '';
		this.observacion = '';
		this.status = false;

		this.puestoID = 0;
		this.temaID = 0;
		this.gerenciaID = 0;
		this.areaID = 0;
		this.sedeID = 0;
		this.area_ponenteID = 0;
    }
}
