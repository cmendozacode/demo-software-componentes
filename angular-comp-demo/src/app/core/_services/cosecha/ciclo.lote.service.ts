import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CicloLoteService {

    private readonly baseUrl:string = environment.api + 'CicloLote';
    private headers:HttpHeaders;
  
    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
      this.headers=this.httpUtils.getHTTPHeaders(); 
    }

    getListaCicloLotes(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ListadoCicloLotes`, params, { headers: this.headers });
    }
}