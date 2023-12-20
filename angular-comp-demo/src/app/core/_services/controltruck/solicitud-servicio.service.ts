import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';
import { SolicitudServicioModel } from '../../_models';
import { User } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class SolicitudServicioService {
  private readonly baseUrl: string = environment.api + 'ctrltruck/SolicitudServicio';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/Listado', datos, { headers: this.headers });

  public insertarRegistro$ = (datos: SolicitudServicioModel, user: User): Observable<any> =>
    this.httpClient.post(this.baseUrl, this.return_JSON_stringify(datos, user), { headers: this.headers });

  public actualizarRegistro$ = (datos: SolicitudServicioModel, user: User): Observable<any> =>
    this.httpClient.put(this.baseUrl, this.return_JSON_stringify(datos, user), { headers: this.headers });

  public programarRegistro$ = (datos: SolicitudServicioModel, user: User): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/Programar', this.return_JSON_stringify(datos, user), { headers: this.headers })

  return_JSON_stringify(dato: any, user: User): any {
    dato.login = user.usuarioWebLogin;
    dato.host = '@yapu.pe';
    return dato;
  }
}
