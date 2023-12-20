import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharlaDiariaModel } from '../../_models/manoobra/charla-diaria.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
	providedIn: 'root'
})
export class CharlaDiariaService {

	private readonly baseUrl: string = environment.api + 'charladiaria';
	private headers: HttpHeaders;

	constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
		this.headers = this.httpUtils.getHTTPHeaders();
	}

	public obtenerRegistro$ = (id: number): Observable<any> => this.httpClient.get(this.baseUrl + '/' + id, { headers: this.headers });
	public listarRegistros$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Listado', datos, { headers: this.headers });
	public insertarRegistro$ = (datos: CharlaDiariaModel): Observable<any> => this.httpClient.post(this.baseUrl, datos, { headers: this.headers });
	public actualizarRegistro$ = (datos: CharlaDiariaModel): Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, { headers: this.headers });
	//public eliminarRegistro$ = (datos: CharlaDiariaModel): Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, { headers: this.headers });
	//public eliminarRegistroMasivo$ = (datos: any): Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, { headers: this.headers });
	public guardarRegistro$ = (formData: FormData): Observable<any> => this.httpClient.post(this.baseUrl + '/GuardarRegistro' , formData, { headers: this.headers });
}
