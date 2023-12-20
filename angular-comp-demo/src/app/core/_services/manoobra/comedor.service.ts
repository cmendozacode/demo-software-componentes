import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComedorModel } from '../../_models/manoobra/comedor.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class ComedorService {

    private readonly baseUrl:string = environment.api + 'comedor';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = ():Observable<any> => this.httpClient.post(this.baseUrl + '/listado', {headers: this.headers});
    public insertarRegistro$ = (datos:ComedorModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:ComedorModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:ComedorModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
    public obtenerFotoComedor$ = (imageCode:string):Observable<Blob> => this.httpClient.get(this.baseUrl + '/GetFotoComedor/' + imageCode, {headers: this.headers, responseType: 'blob'});

    return_JSON_stringify(dato: any){
        return dato;
    }

}