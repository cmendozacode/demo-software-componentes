import { AccesoModel } from './acceso.model';

export class PerfilModel {
    perfilID: number;
    perfilNombre: string;
    perfilAccesos: AccesoModel[];
    perfilStatus: boolean;

    clear(): void {
        this.perfilID = -1;
        this.perfilNombre = '';
        this.perfilAccesos = [];
        this.perfilStatus = true;
	}
}
