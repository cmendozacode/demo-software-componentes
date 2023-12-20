import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComedorGoService {
  private readonly baseUrl:string = environment.api + 'comedorgo';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
    this.headers=this.httpUtils.getHTTPHeaders(); 
  }

  getListaConfiguracionDia(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/listadoconfiruaciondia`,params, { headers: this.headers});
  }
  
  setDisponibilidadComedor(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizardisponibilidad`,transaccion, { headers: this.headers});
  }

  setDobleTurnoComedor(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizarsegundoturno`,transaccion, { headers: this.headers});
  }

  getReporteTrabajadoresComedor(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportetrabajadorescomedor`,params, { headers: this.headers});
  }

  getReporteTrackingAlmuerzos(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportetrackingalmuerzos`,params, { headers: this.headers});
  }

  getReporteTrackingBandejas(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportetrackingbandejas`,params, { headers: this.headers});
  }

  getReporteincidenciasAcopio(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteincidenciaacopio`,params, { headers: this.headers});
  }

  getReporteAvanceRepartos(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteavancerepartos`,params, { headers: this.headers});
  }

  getReporteAlmuerzosEmergencia(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportealmuerzosemergencia`,params, { headers: this.headers});
  }

  public listarSolicitudEmpleados$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl+ '/listadoSolicitudEmpleados', datos, {headers: this.headers});
  public listarSolicitudes$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl+ '/listadoSolicitud', datos, {headers: this.headers});
  public confirmarSolicitud$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/confirmarSolicitud',datos, {headers: this.headers});
  public rechazarSolicitud$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/rechazarSolicitud',datos, {headers: this.headers});
}
