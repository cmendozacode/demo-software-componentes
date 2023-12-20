import { RestriccionTrabajadorExcelModel } from './restriccion.trabajador.excel.model';

export interface LoadRestriccionTrabajadorModel {

    nro_registro?:  string,
    user_login?: string;
    procesar?:      number,
    lista_restricciones?: RestriccionTrabajadorExcelModel[]
}