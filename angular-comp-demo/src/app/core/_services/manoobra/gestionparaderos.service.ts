import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
  providedIn: 'root'
})
export class GestionParaderosService {

    private readonly baseUrl:string = environment.api + 'paraderos';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarSolicitudes$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public confirmarSolicitud$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/confirmarSolicitud',datos, {headers: this.headers});
    public rechazarSolicitud$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/rechazarSolicitud',datos, {headers: this.headers});
}
