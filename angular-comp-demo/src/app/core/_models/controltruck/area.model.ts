export class AreaModel {
	areaID: number;
	areaCodigo: string;
	areaNombre: string;
	areaManual: boolean;

	clear() {
		this.areaID = 0;
		this.areaCodigo = "";
		this.areaNombre = "";
		this.areaManual = false;
	}
}
