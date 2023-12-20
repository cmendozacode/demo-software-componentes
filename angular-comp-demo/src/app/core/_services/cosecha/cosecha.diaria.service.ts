import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CosechaDiariaService {

    private readonly baseUrl:string = environment.api + 'CosechaDiaria';
    private headers:HttpHeaders;
  
    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
      this.headers=this.httpUtils.getHTTPHeaders(); 
    }
    
    getResumenProduccion(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ConsultaResumen`, params, { headers: this.headers });
    }

    getDetalleProduccion(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ConsultaDetalle`, params, { headers: this.headers });
    }

    getViajesDespacho(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/ConsultaViajesDespacho`, params, { headers: this.headers });
    }

    observarBandejas(params:any): Observable<any> {
		  return this.httpClient.post<any>(this.baseUrl + `/UpdateEstadoProduccionCampo`, params, { headers: this.headers });
    }

    actualizarNivelBandejas(params:any): Observable<any> {
		  return this.httpClient.post<any>(this.baseUrl + `/UpdateNivelProduccionCampo`, params, { headers: this.headers });
    }

    actualizarLote(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/UpdateLoteProduccionCampo`, params, { headers: this.headers });
    }

    actualizarBandeja(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/UpdateBandejaProduccionCampo`, params, { headers: this.headers });
    }

    actualizarEstadoDespacho(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/ActualizarEstadoDespacho`, params, { headers: this.headers });
    }

    getViajesVehiculos(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/ConsultaViajesVehiculos`, params, { headers: this.headers });
    }

    actualizarViajeVehiculo(params:any): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + `/ActualizarViajeVehiculo`, params, { headers: this.headers });
    }

}