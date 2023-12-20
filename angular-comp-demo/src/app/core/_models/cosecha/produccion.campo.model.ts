export class ProduccionCampoModel 
{
    produccionCampoID:  number;
    impresionStickerID: number;
    fechaProduccion:    string;
    horaCaptura:        string;

    empresaID:  number;
    fundoID:    number;
    moduloID:   number;
    turnoID:    number;
    loteID:     number;

    supervisorID:       number;
    supervisorLegajo:   string;
    supervisorNombre:   string;
    grupoTrabajoID:     number;
    grupoTrabajoCodigo: string;
    usuarioMovilID:     number;

    trabajadorID:       number;
    trabajadorDNI:      string;
    trabajadorCodigo:   string;
    trabajadorNombres:  string;
    codigoQR:           string;    

    cultivoID:           number;
    cultivoNombre:       string;
    vehiculoID:          number;
    bandejaCosechaID:    number;
    bandejaCosechaNombre:string;
    bandejaCosechaDesc:  string;
    bandejaCosechaTipo:  number;
    variedadID:          number;
    variedadNombre:      string;
    cantidad:            number;
    peso:                number;

    observacion:         string;
    flagTransferido:     number;
    flagObservado:       number;
    flagEstado:          number;
    flagPerdido:         number;

    empresaNombre:  string;
    fundoNombre:    string;
    fundoArea:      number;
    moduloNombre:   string;
    moduloArea:     number;
    moduloZona:     number;
    turnoCodigo:    string;
    turnoNombre:    string;
    turnoArea:      number;
    loteCodigo:     string;
    loteArea:       number;
    loteNombre:     string;

    clear() 
    {
        this.produccionCampoID = 0;
        this.impresionStickerID = 0;
        this.fechaProduccion = "01/01/1900";

        this.empresaID  = 0;
        this.fundoID    = 0;
        this.moduloID   = 0;
        this.turnoID    = 0;
        this.loteID     = 0;
    
        this.supervisorID       = 0;
        this.grupoTrabajoID     = 0;
        this.usuarioMovilID     = 0;
    
        this.trabajadorID       = 0;
        this.trabajadorDNI      = "";
        this.trabajadorCodigo   = "";
        this.trabajadorNombres  = "";
    
        this.codigoQR           = "";
        this.cultivoID          = 0;
        this.vehiculoID         = 0;
        this.bandejaCosechaID   = 0;
        this.variedadID         = 0;
        this.cantidad           = 1.00;
    
        this.observacion        = "";
    
        this.flagTransferido    = 0;
        this.flagObservado      = 0;
        this.flagEstado         = 0;
        this.flagPerdido         = 0;
    
        this.empresaNombre      = "";
        this.fundoNombre        = "";
        this.moduloNombre       = "";
        this.turnoNombre        = "";
        this.loteNombre         = "";
    }
}