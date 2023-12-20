import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  private readonly baseUrl: string = environment.api + 'downloadexcel';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private httpUtils: HttpUtilsService) {
    this.headers = this.httpUtils.getHTTPHeaders();
  }

  public downloadExcelXLS$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/downloadexcelxls', datos, {headers: this.headers, responseType: 'blob'});
  public downloadExcelXLSGroups$ = (datos: any): Observable<Blob> => this.httpClient.post(this.baseUrl + '/downloadexcelxlsgroups', datos, {headers: this.headers, responseType: 'blob'});

}
