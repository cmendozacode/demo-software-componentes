export class TrazabilidadPalletModel {

	//general
	palletID: number
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
	variedadID: number
	variedadNombre: string

	//recepcion
	fechaRecepcion: string
	palletDetalleID: number
	codigoPallet: string
	tipoCosecha:string
	tipoCosechaID: string
	presentacionNombre: string
	presentacionID: number
	tipoBandejaNombre: string
	tipoBandejaID: number
	paletizado: boolean
	numClamshellBandeja: number
	observacion: string
	numJabas: number
	pesoRecepcion: number
	horaIngresoRecepcion: string
	tipoClamshellID: number
	numeroBandejas: number
	paletizadoStatus:boolean

	//DESPACHO
	fechaInicioDespacho: string
	fechaFinDespacho: string
	hInicioCargaDespacho: string
	hFinalCargaDespacho: string
	despachoID: number
	despachoDetalleID: number
	plantadestinoID: number
	numJabasDespachadas: number
	paletizadoDespachoStatus: boolean
	pesoDespachado: number
	viaje: number
	placa: string
	transportista: string
	conductor: string
	numGuia: string
	numPuertaDespacho: number

	//TRATAMIENTO
		//SECADO
		fechaInicioSecado: string
		fechaFinalSecado: string
		hIniSecado: string
		hFinSecado: string
		secadoID: number
		numTunelSecado: number
		stPrefrioID: boolean
		temTunelSecado: number
		temPulpaIniSecado: number
		temPulpaFinSecado: number
		//SANITIZADO
		fechaInicioSanitizado: string
		fechaFinalSanitizado: string
		hIniSanitizado: string
		hFinSanitizado: string
		sanitizadoID: number
		numCamaraSanitizado: number
		loteTanqueSO2: string
		tempTanqueSerpentin: number
		tempCamara: number
		ppm: number
		dosisSO2: number
		temPulpaIniSanitizado: number
		temPulpaFinSanitizado: number
		//ENFRIAMIENTO
		fechaInicioEnfriamiento : string
		fechaFinalEnfriamiento: string
		hIniEnfriamiento: string
		hFinEnfriamiento: string
		enfriamientoID: number
		numTunelEnfriamiento: number
		temTunelEnfriamiento: number
		temPulpaIniEnfriamiento: number
		temPulpaFinEnfriamiento: number

	palletQR: string
	fundoID: number
	fundoNombre: string
	moduloID: number
	moduloNombre: string
	turnoID: number
	turnoNombre: string
	loteID: number
	loteNombre: string

	bacoFormatoID: number
	bacoFormatoDescripcion: string
	fecha: string
	hora: string
}
