import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AusentismoService {
  private readonly baseUrl:string = environment.api + 'ausentismo';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
    this.headers=this.httpUtils.getHTTPHeaders(); 
  }

  getListaAusentismo(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/`,params, { headers: this.headers});
  }
  
  setJustificacionAusentismo(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizarausentismo`,transaccion, { headers: this.headers});
  }
}
