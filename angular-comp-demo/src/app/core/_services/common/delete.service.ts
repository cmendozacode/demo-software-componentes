import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    private readonly baseUrl:string = environment.api;
    private headers:HttpHeaders;

    constructor(private httpClient:HttpClient) { 
        this.headers =  new HttpHeaders();
		this.headers.set('Content-Type', 'application/json');
    }

    public deletePlanilla$ = (args:any):Observable<any> => this.httpClient.post(this.baseUrl + 'planillas/eliminarplanilla', args, {headers: this.headers});
    public deleteDetallePlanilla$ = (args:any):Observable<any> => this.httpClient.post(this.baseUrl + 'planillas/eliminardetalleplanilla', args, {headers: this.headers});

}