import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgrupadorModel } from '../../_models';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class AgrupadorService {

    private readonly baseUrl:string = environment.api + 'agrupador';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = (idCultivo:number):Observable<any> => this.httpClient.get(this.baseUrl + '/' + idCultivo, {headers: this.headers});
    public listarTipoConfiguracion$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/listadoTipoConfig', datos, {headers: this.headers});
    public insertarRegistro$ = (datos:AgrupadorModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:AgrupadorModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:AgrupadorModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
   
}