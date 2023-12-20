import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { forkJoin, Observable } from 'rxjs';
import { each } from 'lodash';
import { ActividadModel } from '../../_models/manoobra/actividad.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ActividadService {

	private httpHeaders;
	private readonly baseUrl:string = environment.api + 'actividad';

  	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
		this.httpHeaders = this.httpUtils.getHTTPHeaders();
	}

  	createActividad(actividad: ActividadModel): Observable<any> {
		return this.http.post<any>(this.baseUrl, actividad, { headers: this.httpHeaders});
	}

	// READ
	getAllActividades(params:any): Observable<ActividadModel[]> {
		return this.http.post<ActividadModel[]>(this.baseUrl + `/listado`,params, { headers: this.httpHeaders});
	}

	getActividadById(actividadId: number): Observable<ActividadModel> {
		return this.http.get<ActividadModel>(this.baseUrl + `/${actividadId}`,{ headers: this.httpHeaders});
  	}
  
  	updateActividad(actividad: ActividadModel): Observable<any> {
		return this.http.put(this.baseUrl+ `/2`, actividad, {headers: this.httpHeaders});
  	}
  
	// DELETE => delete the actividades from the server
	deleteActividad(actividad: ActividadModel): Observable<any> {
		return this.http.put(this.baseUrl+ `/3`, actividad, {headers: this.httpHeaders});
	}

	deleteActividades(actividades: ActividadModel[], status: boolean): Observable<any> {
		const tasks$ = [];
		each(actividades, element => {
			const _actividad = Object.assign({}, element);
			_actividad.status = status;
			tasks$.push(this.deleteActividad(_actividad));
		});
		return forkJoin(tasks$);
	}
}
