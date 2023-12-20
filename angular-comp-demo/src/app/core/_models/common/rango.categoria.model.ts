export class RangoCategoriaModel {
    categoriaID: number;
	categoriaNombre: string;
	categoriaTipo: string;
	categoriaMinimo: number;
	categoriaMaximo: number;
	categoriaStatus?: boolean;
	login?: string;

    clear() {
		this.categoriaID = 0;
		this.categoriaNombre = "";
		this.categoriaTipo = "";
		this.categoriaMinimo = 0;
		this.categoriaMaximo = 0;
		this.categoriaStatus = false;
		this.login = "";
    }
}
