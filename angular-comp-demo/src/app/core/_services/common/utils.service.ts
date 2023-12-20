import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

	private readonly baseUrl: string = environment.api + 'utils';
	private headers: HttpHeaders;

	constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
		this.headers = this.httpUtils.getHTTPHeaders();
	}

	public listarCombo$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoCbo', args, {headers: this.headers});
	public listarComboSemana$ = (): Observable<any> => this.httpClient.get(this.baseUrl + '/ListadoCboSemana', {headers: this.headers});
	public listarSupervisor$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoSupervisor', args, {headers: this.headers});
	public listarSupervisorPacking$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoSupervisorPacking', args, {headers: this.headers});
	public listarComboManoObra$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoCboManoObra', args, {headers: this.headers});
	public listarComboProduccion$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoCboProduccion', args, {headers: this.headers});

  public listarComboControlTruck$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoCboControlTruck', args, { headers: this.headers });
  public listarItemsControlTruck$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoItemsControlTruck', args, { headers: this.headers });
  public eliminarRegistrosControlTruck$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/EliminaRegistrosControlTruck', args, { headers: this.headers });
  public actualizaEstadosControlTruck$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ActualizaEstadosControlTruck', args, { headers: this.headers })

}
