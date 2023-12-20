import { TrabajadorModel } from '../common/trabajador.model';

export class ImpresionStickerModel {
    impresionStickerID:number;
    cultivoID:number;
    cultivoNombre:string;
    bacoID:number;
    bacoDescripcion:string;
    empresaID:number;
    empresaNombre:string;
    grupoCosechaID:number;
    grupoCosechaCodigo:string;
    grupoCosechaDescripcion:string;
    zonaProcedenciaID:number;
    zonaProcedenciaNombre:string;
    impresionStickerFecha:string;
    impresionStickerCantidad:number;
    impresionStickerCantidadTrabajadores:number;
    impresionStickerCantidadBloques:number;
    impresionStickerBloque:number;
    impresionStickerEstado:number;
    impresionStickerUsuario:number;
    grupoCosechaDetalle:TrabajadorModel[];

    clear() {
        this.impresionStickerID = 0;
        this.cultivoID = 0;
        this.cultivoNombre = "";
        this.bacoID = 0;
        this.bacoDescripcion = "";
        this.empresaID = 0;
        this.empresaNombre = "";
        this.grupoCosechaID = 0;
        this.grupoCosechaCodigo = "";
        this.grupoCosechaDescripcion = "";
        this.zonaProcedenciaID = 0;
        this.zonaProcedenciaNombre = "";
        this.impresionStickerFecha = "";
        this.impresionStickerCantidad = 0;
        this.impresionStickerCantidadTrabajadores = 0;
        this.impresionStickerCantidadBloques = 0
        this.impresionStickerBloque = 0
        this.impresionStickerEstado = 0;
        this.grupoCosechaDetalle = [];
    }
}