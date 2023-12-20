import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpUtilsService } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CapturaPesoService {

    private readonly baseUrl:string = environment.api + 'CapturaPeso';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
        this.headers=this.httpUtils.getHTTPHeaders(); 
    }

    consultaListadoPallets(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ListadoPallets`, params, { headers: this.headers });
    }

    capturaPesoPallet(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/UpdateCapturaPesoPallet`, params, { headers: this.headers });
    }

    observacionPallet(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/UpdateObservacionPallet`, params, { headers: this.headers });
    }

    nroGuiaPallets(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/UpdateNroGuiaPallets`, params, { headers: this.headers });
    }
}