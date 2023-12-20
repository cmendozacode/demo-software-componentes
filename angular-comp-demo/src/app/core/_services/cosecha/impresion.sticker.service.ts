import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpresionStickerModel } from '../../_models/cosecha/impresion.sticker.model';
import { environment } from '../../../../environments/environment';
import { HttpUtilsService } from '../../_base/crud';

@Injectable({
    providedIn: 'root'
})
export class ImpresionStickerService {

    private readonly baseUrl:string = environment.api + 'impresionsticker';
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient,private httpUtils: HttpUtilsService) { 
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    public obtenerRegistro$ = (id:number):Observable<any> => this.httpClient.get(this.baseUrl + '/' + id, {headers: this.headers});
    public listarRegistros$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/listado', datos, {headers: this.headers});
    public insertarRegistro$ = (datos:ImpresionStickerModel):Observable<any> => this.httpClient.post(this.baseUrl, datos, {headers: this.headers});
    public actualizarRegistro$ = (datos:ImpresionStickerModel):Observable<any> => this.httpClient.put(this.baseUrl + '/2', datos, {headers: this.headers});
    public eliminarRegistro$ = (datos:ImpresionStickerModel):Observable<any> => this.httpClient.put(this.baseUrl + '/3', datos, {headers: this.headers});
    public eliminarRegistroMasivo$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/Delete',datos, {headers: this.headers});
    //public generarControlAsistenciaPDF$ = (datos:any):Observable<any> => this.httpClient.post(this.baseUrl + '/ReporteControlAsistenctaPDF',datos, {headers: this.headers});
    public generarControlAsistenciaPDF$ = (datos:any):Observable<Blob> => this.httpClient.post(this.baseUrl + '/ReporteControlAsistenctaPDF', datos,{headers: this.headers, responseType: 'blob'});
    return_JSON_stringify(dato: any){
        dato.login = '@yapu';
        return dato;
    }

}