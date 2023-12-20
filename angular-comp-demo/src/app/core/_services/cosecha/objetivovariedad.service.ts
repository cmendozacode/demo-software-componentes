import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';
import { ObjetivoVariedadModel } from '../../_models/cosecha/objetivovariedad.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoVariedadService {

  private readonly baseUrl:string = environment.api + 'objetivovariedad';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = (datos: any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado',datos, {headers: this.headers});
  public insertarRegistro$ = (datos:ObjetivoVariedadModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
  public actualizarRegistro$ = (datos:ObjetivoVariedadModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
  public eliminarRegistro$ = (datos:ObjetivoVariedadModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
  public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});

  return_JSON_stringify(dato: any){
      // dato.idUsuario = this.customStorageService.getCurrentSession().id;
      dato.login = '@yapu';
      return dato;
  }

}
