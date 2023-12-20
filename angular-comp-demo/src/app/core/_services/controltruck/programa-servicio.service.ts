import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../../auth';
import { HttpUtilsService } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { ProgramaServicioModel } from '../../_models/controltruck/programa-servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramaServicioService {
  private readonly baseUrl: string = environment.api + 'ctrltruck/ProgramaServicio';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/Listado', datos, { headers: this.headers });

  public insertarRegistro$ = (datos: ProgramaServicioModel, user: User): Observable<any> =>
    this.httpClient.post(this.baseUrl, this.return_JSON_stringify(datos, user), { headers: this.headers });

  public actualizarRegistro$ = (datos: ProgramaServicioModel, user: User): Observable<any> =>
    this.httpClient.put(this.baseUrl, this.return_JSON_stringify(datos, user), { headers: this.headers });

	public generarLiquidacion$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/GenerarLiquidacion', datos, { headers: this.headers });

	public validarEnviarLiquidacion$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/ValidarEnviarLiquidacion', datos, { headers: this.headers });

  public guardarFacturaLiquidacion$ = (datos: any): Observable<any> =>
    this.httpClient.post(this.baseUrl + '/GuardarFacturaLiquidacion', datos, { headers: this.headers });

  return_JSON_stringify(dato: any, user: User): any {
    dato.login = user.usuarioWebLogin;
    dato.host = '@yapu.pe';
    return dato;
  }
}
