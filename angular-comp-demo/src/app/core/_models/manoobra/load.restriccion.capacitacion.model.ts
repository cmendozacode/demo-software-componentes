import { RestriccionCapacitacionExcelModel } from './restriccion.capacitacion.excel.model';

export interface LoadRestriccionCapacitacionModel {

    nro_registro?:  string,
    user_login?: string;
    procesar?:      number,
    lista_restricciones_capacitacion?: RestriccionCapacitacionExcelModel[]
}
