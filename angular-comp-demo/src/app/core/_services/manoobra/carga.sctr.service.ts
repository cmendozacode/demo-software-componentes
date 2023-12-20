import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpUtilsService} from '../../_base/crud';
import {Observable} from 'rxjs';
import {SctrModel} from '../../_models/manoobra/SctrModel';

@Injectable({
    providedIn: 'root'
})
export class CargaSctrService {
	private readonly baseUrl: string = environment.api + 'CargaSctr';
	private headers: HttpHeaders;

	constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
		this.headers = this.httpUtils.getHTTPHeaders();
	}

	getListaTrabajadorPeriodo(params: any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/ListaTrabajadorPeriodo`, params, { headers: this.headers });
	}

	public registrarTrabajadorPeriodo$ = (datos: SctrModel): Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
	public actualizarTrabajadorPeriodo$ = (datos: SctrModel): Observable<any> => this.httpClient.put(this.baseUrl, datos, {headers: this.headers});
	public anularTrabajadorPeriodo$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/AnularRegistro', datos, {headers: this.headers});
	public anularTrabajadorPeriodoMasivo$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/AnularRegistroMasivo', datos, {headers: this.headers});
}
