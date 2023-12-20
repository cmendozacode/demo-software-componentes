import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcopioModel } from '../../_models/manoobra/acopio.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class AcopioService {

    private readonly baseUrl:string = environment.api + 'acopio';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = ():Observable<any> => this.httpClient.post(this.baseUrl + '/listado', {headers: this.headers});
    public insertarRegistro$ = (datos:AcopioModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:AcopioModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:AcopioModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
    
    return_JSON_stringify(dato: any){
        // dato.idUsuario = this.customStorageService.getCurrentSession().id;
        dato.login = '@yapu';
        return dato;
    }

}