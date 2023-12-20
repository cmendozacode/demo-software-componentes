import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';
import { PlanillaModel } from '../../_models/manoobra/planilla.model';
import { ActividadPlanillaModel, TrabajadorPlanillaModel } from '../../_models';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {
  private readonly baseUrl:string = environment.api + 'planillas';
  private headers:HttpHeaders;

  constructor(private httpClient:HttpClient, private httpUtils: HttpUtilsService) {
    this.headers=this.httpUtils.getHTTPHeaders();
  }

  getResumenPlanillas(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/consultaresumen`,params, { headers: this.headers});
  }

  getPlanillasActividad(params:any): Observable<ActividadPlanillaModel[]> {
    return this.httpClient.post<ActividadPlanillaModel[]>(this.baseUrl + `/planillasactividad`,params, { headers: this.headers});
  }

  getPlanillasDetalle(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/planillasdetalle`,params, { headers: this.headers});
  }

  getPlanillasActividadCombo(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/planillasactividadcbo`,params, { headers: this.headers});
  }

  getActividadSupervisor(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/actividadessupervisor`,params, { headers: this.headers});
  }

  getPadronDetalle(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/padrondetalle`,params, { headers: this.headers});
  }

  getPadronResumen(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/padronresumen`,params, { headers: this.headers});
  }

  getTrabajadorXLegajo(params:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + `/trabajadorlegajo`,params, { headers: this.headers});
  }

	getActividades(empresa:number, tipo:number, flagPacking:number, terceros: number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/actividadestipo/${empresa}/${tipo}/${flagPacking}/${terceros}`,{ headers: this.headers});
  }

  getTurnosDia(empresa:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/turnosdia/${empresa}`,{ headers: this.headers});
  }

  getEmpresaST(empresa:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/empresaSTerceros/${empresa}`,{ headers: this.headers});
  }

  getplanilladetalleST(planillaID:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/planilladetalleST/${planillaID}`,{ headers: this.headers});
  }

  getFundos(empresa:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/fundosEmpresa/${empresa}`,{ headers: this.headers});
  }

  getModulos(fundo:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/modulosFundo/${fundo}`,{ headers: this.headers});
  }

  getCentroCosto(empresa:number,tactividad:number, flagPacking: number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/centroscosto/${empresa}/${tactividad}/ ${flagPacking}`,{ headers: this.headers});
  }

  getLineaPacking(empresa:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/LineaPacking/${empresa}`,{ headers: this.headers});
  }

  getCeCoActividadModulo(empresa: number, actividad:number,modulo:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/cecoactividadmodulo/${empresa}/${actividad}/${modulo}`,{ headers: this.headers});
  }

  getOrdenInversion(empresa:number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/ordeninversion/${empresa}`,{ headers: this.headers});
  }

  getErroresPlanilla(codigos:string): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/listaerroresplanilla/${codigos}`,{ headers: this.headers});
  }

  getPlanillasCodigo(codigos:string): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + `/planillascodigo/${codigos}`,{ headers: this.headers});
  }

  setTrabajadorPlanilla(trabajador:TrabajadorPlanillaModel): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/registrotrabajador`,trabajador, { headers: this.headers});
  }

  insertUpdatePlanilla(planilla:PlanillaModel): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl,planilla, { headers: this.headers});
  }

  setHorasPlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizarhorasplanilla`,transaccion, { headers: this.headers});
  }

  copyTrabajadoresPlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/copiartrabajadoresplanilla`,transaccion, { headers: this.headers});
  }

  changeTrabajadoresPlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/cambiartrabajadoresplanilla`,transaccion, { headers: this.headers});
  }

  updateBonoTrabajadores(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizarbonotrabajador`,transaccion, { headers: this.headers});
  }

  updateEstadoPlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/actualizarestadoplanilla`,transaccion, { headers: this.headers});
  }

  deletePlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/eliminarplanilla`,transaccion, { headers: this.headers});
  }

  deleteDetallePlanilla(transaccion:any): Observable<any> {
		return this.httpClient.post<any>(this.baseUrl + `/eliminardetalleplanilla`,transaccion, { headers: this.headers});
  }

  //---------------------------
  //TAREOPACKING

  getResumenPlanillasPacking(params:any): Observable<any>
  {
    return this.httpClient.post<any>(`${ this.baseUrl }/ConsultaResumenPacking`, params, { headers: this.headers});
  }

  getPadronResumenPacking(params:any): Observable<any> {
    return this.httpClient.post<any>(`${ this.baseUrl }/PadronResumenPacking`, params, { headers: this.headers});
  }

  getPadronDetallePacking(params:any): Observable<any> {
    return this.httpClient.post<any>(`${ this.baseUrl }/PadronDetallePacking`, params, { headers: this.headers});
  }

  getPlanillasDetallePacking(params:any): Observable<any> {
    return this.httpClient.post<any>( `${ this.baseUrl }/PlanillasDetallePacking`,params, { headers: this.headers});
  }

  insertUpdatePlanillaPacking(planilla:PlanillaModel): Observable<any> {
		return this.httpClient.post<any>(`${ this.baseUrl }/InsertUpdatePlanillaPacking`, planilla, { headers: this.headers});
  }

	updateFechaPlanillaPacking(planilla:PlanillaModel): Observable<any> {
		return this.httpClient.post<any>(`${ this.baseUrl }/UpdateFechaPlanillaPacking`, planilla, { headers: this.headers});
  }

  //---------------------------

}
