import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';
import { ActividadCecoModel } from "../../_models/manoobra/cecoactividad.model";
import { User } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class ActividadCecoService {

  private readonly baseUrl:string = environment.api + 'actividadceco';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = (datos: any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado',datos, {headers: this.headers});
  public insertarRegistro$ = (datos:ActividadCecoModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
  public actualizarRegistro$ = (datos:ActividadCecoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
  public eliminarRegistro$ = (datos:ActividadCecoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
  public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});

	public importarRegistros$ = (datos: any, user: User): Observable<any> => this.httpClient.post(this.baseUrl + '/importar', this.return_JSON_stringify(datos, user), {headers: this.headers});
	public procesarRegistros$ = (datos: any, user: User): Observable<any> => this.httpClient.post(this.baseUrl + '/procesar', this.return_JSON_stringify(datos, user), {headers: this.headers});


  return_JSON_stringify(dato: any, user?: User){
			dato.login = user.usuarioWebLogin;
      dato.login = '@yapu';
      return dato;
  }

}
