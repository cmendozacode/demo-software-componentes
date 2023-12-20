export class UbicacionModel {
  ubicacionID: number;
  ubicacionNombre: string;
  ubicacionReferencia: string;
  ubicacionLatitud: string;
  ubicacionLongitud: string;

  clear() {
    this.ubicacionID = 0;
    this.ubicacionNombre = '';
    this.ubicacionReferencia = '';
    this.ubicacionLatitud = '';
    this.ubicacionLongitud = '';
  }
}
