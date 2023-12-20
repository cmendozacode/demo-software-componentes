import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class TrabajadorService {

    private readonly baseUrl:string = environment.api + 'trabajador';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado', datos, {headers: this.headers});
    public obtenerRegistro$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/obtener', datos, {headers: this.headers});

    return_JSON_stringify(dato: any){
        // dato.idUsuario = this.customStorageService.getCurrentSession().id;
        dato.login = '@yapu';
        return dato;
    }

}