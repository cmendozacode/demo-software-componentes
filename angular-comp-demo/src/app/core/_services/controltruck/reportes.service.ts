import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HttpUtilsService } from '../../_base/crud';

import { Observable } from 'rxjs';
import { ParamsModel } from '../../_models/common/params.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesControlTruckService {

  private readonly baseUrl: string = environment.api + 'ctrltruck/reportes';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public getReporteGenericoDT = (params: ParamsModel): Observable<any> =>
		this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoDT', params, { headers: this.headers });
  public getReporteGenericoDS = (params: ParamsModel): Observable<any> =>
		this.httpClient.post<any>(this.baseUrl + '/ReporteGenericoDS', params, { headers: this.headers });

}
