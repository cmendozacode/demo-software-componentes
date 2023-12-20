import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RangoCategoriaModel } from '../../_models/common/rango.categoria.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class RangoCategoriaService {

    private readonly baseUrl: string = environment.api + 'rangocategoria';
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = (datos: any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado', datos, {headers: this.headers});
    public insertarRegistro$ = (datos: RangoCategoriaModel): Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos: RangoCategoriaModel): Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos: RangoCategoriaModel): Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});

    return_JSON_stringify(dato: any) {
        // dato.idUsuario = this.customStorageService.getCurrentSession().id;
        dato.login = '@yapu';
        return dato;
    }

}
