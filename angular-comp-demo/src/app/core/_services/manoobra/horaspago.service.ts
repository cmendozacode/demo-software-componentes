import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';
import { HorasPagoModel } from '../../_models/manoobra/horaspago.model';

@Injectable({
  providedIn: 'root'
})
export class HorasPagoService {

  private readonly baseUrl:string = environment.api + 'horaspago';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public listarRegistros$ = ():Observable<any> => this.httpClient.post(this.baseUrl + '/listado', {headers: this.headers});
  public insertarRegistro$ = (datos:HorasPagoModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
  public actualizarRegistro$ = (datos:HorasPagoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
  public eliminarRegistro$ = (datos:HorasPagoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
  public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});

  return_JSON_stringify(dato: any){
      dato.login = '@yapu';
      return dato;
  }
}
