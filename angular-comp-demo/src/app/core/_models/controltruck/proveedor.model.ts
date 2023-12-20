import { UsuarioModel } from "../seguridad/usuario.model";

export class ProveedorModel {
	proveedorID: number;
	tipoServicioID: number;
	tipoServicioNombre: string;
	proveedorNombre: string;
	proveedorRazonSocial: string;
	proveedorRuc: string;
	proveedorDireccion: string;
	proveedorContacto: string;
	proveedorTelefono: string;
	proveedorCorreos: string;
	proveedorListaCorreos: string[];
	listaUsuarios: UsuarioModel[];

	clear() {
		this.proveedorID = 0;
		this.tipoServicioID = -1;
		this.tipoServicioNombre = "";
		this.proveedorNombre = "";
		this.proveedorRazonSocial = "";
		this.proveedorRuc = "";
		this.proveedorDireccion = "";
		this.proveedorContacto = "";
		this.proveedorTelefono = "";
		this.proveedorCorreos = "";
		this.proveedorListaCorreos = [];
		this.listaUsuarios = [];
	}
}
