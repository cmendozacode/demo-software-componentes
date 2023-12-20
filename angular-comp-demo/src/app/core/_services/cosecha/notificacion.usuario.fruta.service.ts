import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class NotificacionUsuarioFrutaService {

    private readonly baseUrl:string = environment.api + 'UsuarioNotificacionFruta';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Listado', datos, { headers: this.headers })
    public guardarRegistro$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Save', datos, { headers: this.headers })
    public eliminarRegistroMasivo$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, { headers: this.headers })

}