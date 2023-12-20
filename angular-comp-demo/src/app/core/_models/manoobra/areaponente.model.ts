export class AreaPonenteModel {
    area_ponenteID:number;
	area_ponente:string;

	temaID:number;
	tema:string;


    clear() {
		this.area_ponenteID = 0;
		this.area_ponente = "";

		this.temaID = 0;
		this.tema = "";
    }
}
