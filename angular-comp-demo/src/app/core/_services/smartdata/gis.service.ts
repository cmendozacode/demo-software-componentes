import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpUtilsService } from "../../_base/crud";

@Injectable({
	providedIn: "root"
})
export class GisService {
	private readonly baseUrl: string = environment.api + "gis";
	private headers: HttpHeaders;

	constructor(
		private httpClient: HttpClient,
		private httpUtils: HttpUtilsService
	) {
		this.headers = this.httpUtils.getHTTPHeaders();
	}

	public consultarIndicador$ = (datos:any): Observable<any> => this.httpClient.post(this.baseUrl + '/consultarIndicador', datos, { headers: this.headers });
	public listadoGeoJson$ = (fileGeojson: any): Observable<any> => this.httpClient.get("assets/gis/" + fileGeojson + ".geojson");
	public obtenerDetalleLote$ = (datos:any): Observable<any> => this.httpClient.post(this.baseUrl + '/obtenerDetalleLote', datos, { headers: this.headers });
	public listadoParcelasGeoJson$ = (datos:any): Observable<any> => this.httpClient.post(this.baseUrl + '/obtenerParcelasGeoJson', datos, { headers: this.headers });

}
