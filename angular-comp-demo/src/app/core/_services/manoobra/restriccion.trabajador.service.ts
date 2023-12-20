import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';
import { RestriccionTrabajadorModel } from '../../_models/manoobra/restriccion.trabajador.model';

@Injectable({
    providedIn: 'root'
})
export class RestriccionTrabajadorService {


    private readonly baseUrl:string = environment.api + 'RestriccionTrabajador';
    private headers:HttpHeaders;
  
    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
      this.headers=this.httpUtils.getHTTPHeaders(); 
    }

    getListaRestricciones(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ListaRestricciones`, params, { headers: this.headers });
    }

    getListaTrabajadores(params:any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + `/ListaTrabajadores`, params, { headers: this.headers });
    }

    public actualizarRestriccion$ = (datos:RestriccionTrabajadorModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});    
    public actionRegistrosMasivo$ = (datos:any, action: number):Observable<any> => this.httpClient.post(this.baseUrl + '/Action/'+ action, datos, {headers: this.headers});
    public actualizarTrabajador$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/ActualizarTrabajador', datos, {headers: this.headers});
    public actualizarTrabajadorMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/ActualizarTrabajadores', datos, {headers: this.headers});

}