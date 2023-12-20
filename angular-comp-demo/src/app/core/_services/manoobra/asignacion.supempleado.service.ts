import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
  providedIn: 'root'
})
export class AsignacionSupEmpleadoService {

    private readonly baseUrl:string = environment.api + 'supervisorEmpleado';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = ():Observable<any> => this.httpClient.get(this.baseUrl, {headers: this.headers});
    public obtenerRegistro$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/obtener', datos, {headers: this.headers});
    public insertarRegistro$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:any):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
}
