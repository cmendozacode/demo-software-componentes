import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoCosechaModel } from '../../_models/manoobra/grupo.cosecha.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';
import { User } from "../../auth";

@Injectable({
    providedIn: 'root'
})
export class GrupoCosechaService {

    private readonly baseUrl:string = environment.api + 'grupocosecha';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public obtenerRegistro$ = (id:number):Observable<any> => this.httpClient.get(this.baseUrl + '/' + id, {headers: this.headers});
    public listarRegistros$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado', datos, {headers: this.headers});
    public insertarRegistro$ = (datos:GrupoCosechaModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:GrupoCosechaModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2',datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:GrupoCosechaModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
    public generarControlAsistenciaPDF$ = (datos:any):Observable<Blob> => this.httpClient.post(this.baseUrl + '/ReporteControlAsistenctaPDF', datos,{headers: this.headers, responseType: 'blob'});
	public eliminarTrabajador$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/EliminarTrabajador', datos, {headers: this.headers});
	public cambiarGrupoTrabajador$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/CambiarGrupoTrabajador', datos, {headers: this.headers});

	public importarRegistros$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/importar', this.return_JSON_stringify(datos), {headers: this.headers});

	return_JSON_stringify(dato: any, user?: User): any {
	    dato.host = '@yapu.pe';
	    return dato;
	}
}
