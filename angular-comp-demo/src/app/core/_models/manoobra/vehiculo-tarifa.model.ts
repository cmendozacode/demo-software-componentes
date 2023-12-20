export class VehiculoTarifaModel {

    vehiculoTarifaID: number;
    vehiculoID: number;

    origenID: number;
    origenNombre?: string;

    destinoID: number;
    destinoNombre?: string;

    tipoID:number;
    tipoNombre?: string;

    tarifa: number;

    status: boolean;

    _isEditMode: boolean;

    jsonTarifas: string;

    clear(){
        this.vehiculoTarifaID = -1;
        this.vehiculoID = -1;
        
        this.origenID = -1;
        this.origenNombre = '';

        this.destinoID = -1;
        this.destinoNombre = '';

        this.tipoID = -1;
        this.tipoNombre = '';

        this.status = false;

        this._isEditMode=false;

        this.jsonTarifas = '';
    }

}