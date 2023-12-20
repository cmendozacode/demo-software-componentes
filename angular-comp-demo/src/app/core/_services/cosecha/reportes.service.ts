import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesCosechaService {

  private readonly baseUrl: string = environment.api + 'cosecha/reportes';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public getRptRankingCosecha$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reporterankingcosecha', datos, {headers: this.headers});
  public RptRankingCosechaXLS$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/reporterankingcosechaxls', datos, {headers: this.headers, responseType: 'blob'});
  public getRptCae$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportecae', datos, {headers: this.headers});
	public getDetalleReptCae$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportecaedetalle', datos, {headers: this.headers});
	public getRptCruceTareoCosecha$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportecrucetareocosecha', datos, {headers: this.headers});
  public getRptCruceCosechaCae$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportecrucecampocae', datos, {headers: this.headers});
  public getRptDescarteCosecha$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportedescartecosecha', datos, {headers: this.headers});
  public RptCaeXLS$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/reportecaexls', datos,{headers: this.headers, responseType: 'blob'});
  public RptRptDetalleTrabajador$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/reportedetalletrabajador', datos,{headers: this.headers, responseType: 'blob'});
  public RptRptDetalleTrabajadorData$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportedetalletrabajadordata', datos,{headers: this.headers});
  public RptViajesDespachoCosecha$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reporteviajesdespachocosecha', datos, {headers: this.headers});
  public RptViajesDespachoCosechaXLS$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/reporteviajesdespachocosechaxls', datos,{headers: this.headers, responseType: 'blob'});
  public getRptNivelesKPI$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reporteniveleskpi', datos, {headers: this.headers});
  public getReporteGenericoCosechaDT = (params: any): Observable<any> => this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoCosechaDT', params, { headers: this.headers });
  public getReporteGenericoCosechaDS = (params: any): Observable<any> => this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoCosechaDS', params, { headers: this.headers });
  public RptGruposCosechaFrutaSinDespachar$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportegruposcosechafrutasindespachar', datos, {headers: this.headers});
  public RptTarifasVehiculos$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reportetarifasvehiculos', datos, {headers: this.headers});

	public actualizarRegistro$ = (datos: any):Observable<any> => this.httpClient.post(this.baseUrl + '/ActualizarDatosCae', datos, {headers: this.headers});


}
