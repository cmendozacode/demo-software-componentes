export interface FormatoExcel{
    idFormato:number,
    nombreFormato:string,
    rutaArchivo:string,
    cols: FormatoExcelCols[]
}

interface FormatoExcelCols
{
    field: string,
    header: string,
    align: string,
    size: string
}