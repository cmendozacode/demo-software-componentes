import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProyeccionService {

    private readonly baseUrl: string = environment.api + 'proyeccion';
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Listado', datos, {headers: this.headers});
	public importarProyeccion$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Importar', datos, {headers: this.headers});
	public guardarProyeccion$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Guardar', datos, {headers: this.headers});
	public cambiarEstadoProyeccion$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/CambiarEstado', datos, {headers: this.headers});

	public listarRegistrosDetalle$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoDetalle', datos, {headers: this.headers});
	public importarProyeccionDetalle$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ImportarDetalle', datos, {headers: this.headers});
	public guardarProyeccionDetalle$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/GuardarDetalle', datos, {headers: this.headers});
	public cambiarEstadoProyeccionDetalle$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/CambiarEstadoDetalle', datos, {headers: this.headers});

	public listarRegistrosAjuste$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoAjuste', datos, {headers: this.headers});
	public guardarProyeccionAjuste$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/GuardarAjuste', datos, {headers: this.headers});
	public cambiarEstadoProyeccionAjuste$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/CambiarEstadoAjuste', datos, {headers: this.headers});
}
