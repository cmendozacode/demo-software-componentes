import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';
import { RestriccionCapacitacionModel } from '../../_models/manoobra/restriccion.capacitacion.model';

@Injectable({
    providedIn: 'root'
})
export class RestriccionCapacitacionService {


    private readonly baseUrl:string = environment.api + 'RestriccionCapacitacion';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
      this.headers=this.httpUtils.getHTTPHeaders();
    }

	public getListaRestriccionesCapacitaciones$ = ():Observable<any> => this.httpClient.get(this.baseUrl + '/ListaRestriccionesCapacitaciones', {headers: this.headers});
	public insertarRegistro$ = (datos:RestriccionCapacitacionModel):Observable<any> => this.httpClient.put(this.baseUrl + '/1', datos, {headers: this.headers});
	public actualizarRegistro$ = (datos:RestriccionCapacitacionModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
	public eliminarRegistro$ = (datos:RestriccionCapacitacionModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});


}
