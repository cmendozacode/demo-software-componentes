import { CicloLoteExcelModel } from './ciclo.lote.excel.model';

export interface LoadCicloLoteModel {

    nro_registro?:  string,
    user_login?: string;
    procesar?:      number,

    lista_registros?: CicloLoteExcelModel[]
}