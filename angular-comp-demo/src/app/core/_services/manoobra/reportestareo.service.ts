import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportestareoService {
  private readonly baseUrl:string = environment.api + 'reportes';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
    this.headers=this.httpUtils.getHTTPHeaders();
  }

  getReporteHoras(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportehorastareo`,params, { headers: this.headers});
  }

  getReporteAuditoriaHorasPago(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteauditoriahrpago`,params, { headers: this.headers});
  }

  getReporteHoraSemana(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportesemanaltareo`,params, { headers: this.headers});
  }

  getReporteAsistencia(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteasistenciatareo`,params, { headers: this.headers});
  }

	getReporteValidacionTareoMovilControlBus(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportevalidaciontareoctrlbus`,params, { headers: this.headers});
  }

  getReporteIncidenciaDia(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteincidenciadia`,params, { headers: this.headers});
  }

  getReporteAuditoriaWeb(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteauditoriaweb`,params, { headers: this.headers});
  }

  getReporteGruposTrabajo(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reportegrupostrabajo`,params, { headers: this.headers});
  }

  getReporteAuditoriaMovil(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/reporteauditoriamovil`,params, { headers: this.headers});
  }

  getReporteParaderos(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteParaderos`,params, { headers: this.headers});
  }

  getReporteBonoCalidad(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteBonoCalidad`,params, { headers: this.headers});
  }

  getReporteActividadDiaTarea(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteActividadDiaTarea`,params, { headers: this.headers});
  }

  getReporteDashboardTareoCampo(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteDashboardTareoCampo`,params, { headers: this.headers});
  }

  getReporteHorasPacking(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteHorasTareoPacking`,params, { headers: this.headers});
  }

  getReporteHoraSemanaPacking(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteSemanalTareoPacking`,params, { headers: this.headers});
  }

  getReporteAsistenciaPacking(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteAsistenciaTareoPacking`,params, { headers: this.headers});
  }

  getReporteComedorPacking(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteComedorPacking`,params, { headers: this.headers});
  }

  getReporteContratoVencer(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteContratoVencer`,params, { headers: this.headers});
  }

  getReporteAsignacionGrupos(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteAsignacionGrupos`,params, { headers: this.headers});
  }

  getReporteSeguimientoGruposLabores(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteSeguimientoGruposLabores`,params, { headers: this.headers});
  }

	getReporteBonoCooperador(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/ReporteBonoCooperador`,params, { headers: this.headers});
  }


  public getReporteGenericoManoObraDT = (params: any): Observable<any> => this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoManoObraDT', params, { headers: this.headers });
  public getReporteGenericoManoObraDS = (params: any): Observable<any> => this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoManoObraDS', params, { headers: this.headers });

  public getRptCharlaDiaria$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ReporteCharlaDiaria', datos, {headers: this.headers});
  public RptCharlaDiariaXLS$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/ReporteCharlaDiariaXLS', datos, {headers: this.headers, responseType: 'blob'});
  public reporteAvancePoda$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/reporteavancepoda', datos, {headers: this.headers});

}
