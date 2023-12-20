import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CierreProduccionService {

    private readonly baseUrl:string = environment.api + 'CierreProduccion';
    private headers:HttpHeaders;
  
    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) 
    {
      this.headers=this.httpUtils.getHTTPHeaders(); 
    }

    getCierrePendiente(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/CierrePendiente`, params, { headers: this.headers });
    }

    getCierreResumen(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/CierreResumen`, params, { headers: this.headers });
    }

    procesarCierre(params:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/ProcesarCierre`,params, { headers: this.headers});
    }

}