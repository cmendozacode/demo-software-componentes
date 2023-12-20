import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';

import { environment } from '../../../../environments/environment';

import { LoadRestriccionTrabajadorModel } from '../../_models/manoobra/load.restriccion.trabajador.model';
import { LoadCicloLoteModel } from '../../_models/cosecha/load.ciclo.lote.model';
import { LoadRestriccionCapacitacionModel } from '../../_models/manoobra/load.restriccion.capacitacion.model';
import { CargaDatosXLSXModel } from '../../_models';
import {LoadTrabajadorPeriodoSctrModel} from '../../_models/manoobra/load.trabajador.periodo.sctr.model';

@Injectable({
    providedIn: 'root'
})
export class LoadExcelService {

  private readonly baseUrl: string = environment.api + 'LoadExcel';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
  	this.headers = this.httpUtils.getHTTPHeaders();
  }

	public listadoTrabajadorPeriodoStrcXLSX$ = (datos: LoadTrabajadorPeriodoSctrModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoTrabajadorPeriodoStrcXLSX', datos, {headers: this.headers});
	public processTrabajadorPeriodoStrcXLSX$ = (dato: LoadTrabajadorPeriodoSctrModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ProcesaTrabajadorPeriodoStrcXLSX', dato, {headers: this.headers});

  public listadoRestriccionesXLSX$ = (datos: LoadRestriccionTrabajadorModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoRestriccionesXLSX', datos, {headers: this.headers});
  public processRestriccionesXLSX$ = (dato: LoadRestriccionTrabajadorModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ProcesaRestriccionesXLSX', dato, {headers: this.headers});

  public listadoCicloLoteXLSX$ = (datos: LoadCicloLoteModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoCicloLoteXLSX', datos, {headers: this.headers});
  public processCicloLoteXLSX$ = (dato: LoadRestriccionTrabajadorModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ProcesaCicloLoteXLSX', dato, {headers: this.headers});

	public listadoRestriccionesCapacitacionXLSX$ = (datos: LoadRestriccionCapacitacionModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ListadoRestriccionesCapacitacionXLSX', datos, {headers: this.headers});
  public processRestriccionesCapacitacionXLSX$ = (dato: LoadRestriccionCapacitacionModel): Observable<any> => this.httpClient.post(this.baseUrl + '/ProcesaRestriccionesCapacitacionXLSX', dato, {headers: this.headers});

  public loadDataXlsx$ = (datos: CargaDatosXLSXModel): Observable<any> => this.httpClient.post(this.baseUrl + '/LoadDataXlsx', datos, { headers: this.headers });
  public processDataXlsx$ = (args: any): Observable<any> => this.httpClient.post(this.baseUrl + '/ProcessDataXlsx', args, { headers: this.headers });
  public listarFields$ = (formatoID: number): Observable<any> => this.httpClient.get(this.baseUrl + '/ListadoFields/' + formatoID);
}



