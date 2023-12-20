import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
  providedIn: 'root'
})
export class DenominacionCecoService {
  private readonly baseUrl: string = environment.api + 'ctrltruck/denominacionceco';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/listado', datos, { headers: this.headers })
  public insertarRegistro$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl, datos, { headers: this.headers })
  public actualizarRegistro$ = (datos: any): Observable<any> =>
    this.httpClient.put(this.baseUrl + '/2', datos, { headers: this.headers })
  public eliminarRegistroMasivo$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/Delete', datos, { headers: this.headers })
}
