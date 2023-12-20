export class AccesoModel {
    perfilAccesoID: number;
    perfilAccesoNombre: string;
    perfilAccesoTag: string;
    perfilAccesoIDPadre: number;
    perfilStatus: boolean;
    
    clear(): void {
        this.perfilAccesoID = -1;
        this.perfilAccesoNombre = '';
        this.perfilAccesoTag = '';
        this.perfilAccesoIDPadre = undefined;
        this.perfilStatus = true;
	}
}
