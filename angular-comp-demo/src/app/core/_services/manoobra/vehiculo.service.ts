import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculoModel } from '../../_models/manoobra/vehiculo.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class VehiculoService {

    private readonly baseUrl:string = environment.api + 'vehiculo';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public listarRegistros$ = ():Observable<any> => this.httpClient.post(this.baseUrl + '/listado', {headers: this.headers});
    public insertarRegistro$ = (datos:VehiculoModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:VehiculoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:VehiculoModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete', datos, {headers: this.headers});
    
    public listarTarifas$ = (id: number): Observable<any> => this.httpClient.get(this.baseUrl + '/ListadoTarifas/' + id, { headers: this.headers });
    public registrarTarifas$ = (datos:VehiculoModel):Observable<any> => this.httpClient.post(this.baseUrl + '/RegistraTarifas', datos, { headers: this.headers });

    return_JSON_stringify(dato: any){
        // dato.idUsuario = this.customStorageService.getCurrentSession().id;
        dato.login = '@yapu';
        return dato;
    }

}