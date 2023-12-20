import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
  providedIn: 'root'
})
export class AsignacionSupervisorService {

    private readonly baseUrl:string = environment.api + 'asignacion';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarAsignacion$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public eliminarAsignacion$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/eliminarasignacion',datos, {headers: this.headers});
    
}
