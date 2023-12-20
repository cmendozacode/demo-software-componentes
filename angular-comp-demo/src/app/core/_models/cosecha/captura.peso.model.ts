export class CapturaPesoModel {
    palletID:       number;
    palletCodigo:   string;

    fechaPallet:    string;
    horaPallet:     string;

    empresaID:      number;
    emmpresaNombre?: string;

    moduloID:       number;
    moduloNombre?:   string;

    tipoBandejaID:   number;
    tipoBandejaDescripcion?: string;

    tipoClamshellID: number;
    tipoClamshellDescripcion?: string;

    bandejaCosechaID: number;
    bandejaCosechaDescripcion?: string;

    variedadID:     number;
    variedadDescripcion?:    string;

    transporteCosechaID?:    number;
    nroViaje?:               number;

    vehiculoID?:             number;
    vehiculoPlaca?:          string;

    acopioID:          number;
    acopioDescripcion?: string;

    cultivoID?:      number;
    cultivoNombre?:  string;

    nroBandejas:    number;
    nroClamshells:  number;

    pesoBruto:      number;
    pesoNeto:       number;
    pesoTara:       number;

    flagDespachado?: boolean;
    flagCompleto?:   boolean;
    flagUtilizado?:  boolean;
    flagPaletizado?:  boolean;

    observacion?:  string;
    tipoPaletizadoID?:number

    clear() {
        this.palletID       = -1;
        this.palletCodigo   = "";
    
        this.fechaPallet    = "";
        this.empresaID      = -1;
        this.emmpresaNombre = "";
    
        this.moduloID       = -1;
        this.moduloNombre   = "";
    
        this.tipoBandejaID = -1;
        this.tipoBandejaDescripcion = "";

        this.tipoClamshellID = -1;
        this.tipoClamshellDescripcion = "";

        this.bandejaCosechaID = -1;
        this.bandejaCosechaDescripcion = "";
    
        this.variedadID = -1;
        this.variedadDescripcion = "";
    
        this.transporteCosechaID = -1;
        this.nroViaje = -0;
    
        this.vehiculoID = -1;
        this.vehiculoPlaca = "";
    
        this.acopioID = -1;
        this.acopioDescripcion = "";
    
        this.cultivoID = -1;
        this.cultivoNombre = "";
    
        this.nroBandejas = 0;
        this.nroClamshells = 0;

        this.pesoBruto = 0.0;
        this.pesoNeto = 0.0;
        this.pesoTara = 0.0
    
        this.flagDespachado = false;
        this.flagCompleto = false;
        this.flagUtilizado = false;
        this.flagPaletizado = false;
        
        this.observacion="";
        this.tipoPaletizadoID = 0
    }
}