export class PalletModel {
    palletID: number
    trcoID: number
    palletFecha: string
    palletCodigo: string
    acopioID: number
    acopioDescripcion: string
    empresaID: number
    empresaNombre: string
    cultivoID: number
    cultivoNombre: string
    palletPeso: number
    palletNumeroBandejas: number
    palletDespachado: boolean
    palletCompleto: boolean
    palletUtilizado: boolean
    vehiculoID: number
    vehiculoPlaca: string

    palletQR: string
    fundoID: number
    fundoNombre: string
    moduloID: number
    moduloNombre: string
    turnoID: number
    turnoNombre: string
    loteID: number
    loteNombre: string
    variedadID: number
    variedadNombre: string
    bacoFormatoID: number
    bacoFormatoDescripcion: string
    fecha: string
    hora: string

    clear() {
        this.palletID = 0
        this.trcoID = 0
        this.palletFecha = ""
        this.palletCodigo = ""
        this.acopioID = 0
        this.acopioDescripcion = ""
        this.empresaID = 0
        this.empresaNombre = ""
        this.cultivoID = 0
        this.cultivoNombre = ""
        this.palletPeso = 0.0
        this.palletNumeroBandejas = 0
        this.palletDespachado = false
        this.palletCompleto = false
        this.palletUtilizado = false
        this.vehiculoID = 0
        this.vehiculoPlaca = ""

        this.palletQR = ""
        this.fundoID = 0
        this.fundoNombre = ""
        this.moduloID = 0
        this.moduloNombre = ""
        this.turnoID = 0
        this.turnoNombre = ""
        this.loteID = 0
        this.loteNombre = ""
        this.variedadID = 0
        this.variedadNombre = ""
        this.bacoFormatoID = 0
        this.bacoFormatoDescripcion = ""
        this.fecha = ""
        this.hora = ""
    }
}