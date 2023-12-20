import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of ,from} from 'rxjs';
 
import { HttpUtilsService } from '../../../core/_base/crud';
import { environment } from '../../../../environments/environment';




@Injectable({
    providedIn: 'root',
  })
export class PeriodosService {

    private readonly baseSecurityUrl:string = environment.apiGlobalSecurity;
    private headers:HttpHeaders; 

    constructor(private http: HttpClient,private httpUtils:HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }







  /* BEGIN - Genereal   */

  public getObjectRequest(objBody:any, objHeader:any, objTable:any): any {

    objHeader['Content-Type'] = 'application/json';
    objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
    objHeader['object_name'] = objTable ;
    objHeader['http_method'] = 'GET';

    var varHeader = new HttpHeaders(objHeader);

    return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader}).toPromise();
  }


  public postObjectRequest(objBody:any, objHeader:any, objTable:any, httpMethod:any): any {

    objHeader['Content-Type'] = 'application/json';
    objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
    objHeader['object_name'] = objTable ;
    objHeader['http_method'] = httpMethod ;

    var varHeader = new HttpHeaders(objHeader);

    return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader}).toPromise();
  }


  public getSearchObjectBase(objBody:any, objHeader:any, objTable:any ): any {
    
    var objResponse = this.getObjectRequest(objBody,objHeader,objTable)
      .then((response) => {
        var objResult = {};
            objResult['data'] = response;
            objResult['requestcomplete'] = true;
            objResult['message'] = 'ok';    
        return objResult;
      })
      .catch((err) => {throw new Error(err.error +' - '+ err.message); }); 

      return objResponse;  

  }


   //Generic Search Method
   public getSearchObject(objBody:any, objHeader:any, objTable:any ): any {

    //Load Datos
    var objResult = Promise.resolve()
    .then((res) => { 
      var objResponse = this.getSearchObjectBase(objBody,objHeader,objTable);
       return objResponse;  
    })
    .then((res) => { 
      return res;
    })
    .catch((err) => {
      var objResult = {};
          objResult['requestcomplete'] = false;
          objResult['message'] = err.message;
          return objResult;  
    });

    return objResult;
  }


  
  public saveObjectRequest(objBody:any, objHeader:any, objTable:any, httpMethod:any): any {

    var responseUser = this.postObjectRequest(objBody,objHeader,objTable,httpMethod)
    .then((response) =>  {

      var txtmessageresponse='';
      var lsize = 0;
      if(httpMethod == 'POST' && response['id']>0){lsize = 1; txtmessageresponse= 'txtobjectcreated';}
      if(httpMethod == 'PUT' && response ){lsize = 1; txtmessageresponse= 'txtobjectupdated';}
      if(httpMethod == 'DELETE' && response ){lsize = 1; txtmessageresponse= 'txtobjectdeleted';}

        var responseUseri = {};
            responseUseri['requestcomplete'] = true;

        if(lsize >0){  
            responseUseri['message'] = txtmessageresponse;               
            responseUseri['data'] = response;
        }
        else{  responseUseri['message'] = 'txterrorrequest';  responseUseri['requestcomplete'] = false;   }
           
        return responseUseri;
    })
    .catch((err) => {throw new Error(err.error +' - '+ err.message);  });  

    return responseUser;

  }


  /* END - Genereal   */


 //Get Company
 public getSearchCompany(objBody:any, objHeader:any): any {
    //Load Datos
    var objResult = this.getSearchObject(objBody,objHeader,'security.company_all');
    return objResult;
 }



//Get Empresas
  public getSearchEnterprise(objBody:any, objHeader:any, prefixobject:any): any {
    objHeader['custom_method'] = 'remotequery';
    //Load Datos
    var objResult = this.getSearchObject(objBody,objHeader,prefixobject+'_enterprise');
    return objResult;
}


//Get Cultivo
public getSearchCultivo(objBody:any, objHeader:any, prefixobject:any): any {
    objHeader['custom_method'] = 'remotequery';
    //Load Datos
    var objResult = this.getSearchObject(objBody,objHeader,prefixobject+'_cultivo');
    return objResult;
}





/* BEGIN - CAMPAIGN PERIODS COSECHA */ 

public getCampaignPeriods(objBody:any, objHeader:any): any {

  //Load Datos
  var objResult = this.getSearchObject(objBody,objHeader,'DEMOWEB_campaign_periods_all');
  return objResult;
}


  //Save New CampaignPeriods
  public saveCampaignPeriods(objBody:any, objHeader:any, httpMethod:any): any {

    var objData = objBody['object_parameters'];
      if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }
    var objBodyQuery = {'object_parameters':{ 'company_id': objData['company_id'],'company_sede_id': objData['company_sede_id'],'cultivo_id': objData['cultivo_id'], 'code':objData['code'] }};

    //Load Datos
    var objResult = Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){
        objResponse = this.getObjectRequest(objBodyQuery,objHeader,'DEMOWEB_campaign_periods_all')
                          .then((response) =>  { return response;  })
                          .catch((err) => {throw new Error(err.error +' - '+ err.message); });                          
      }

      return objResponse;
    })
    .then((res) => { 

      var flagFoundUser = Object.keys(res).length;  
      var responseUser = {};

      if( httpMethod == 'PUT' )
        { for(var i=0;i<flagFoundUser;i++){ if(res[i]['id'] == objData['id']){ flagFoundUser = 0; break; }  } }
    
      if( httpMethod == 'DELETE' ){  flagFoundUser = 0; }

      if( flagFoundUser > 0 )
        { responseUser['message'] = 'txtcodealreadyexists'; 
          responseUser['requestcomplete'] = false; }
      else
       { responseUser =  this.saveObjectRequest(objBody,objHeader,'DEMOWEB_campaign_periods_all',httpMethod); }

      return responseUser;

    })
    .then((res) => { 
        console.log('Final de Proceso::');
        return res;
    })
    .catch((err) => {
           var objResult = {};
               objResult['requestcomplete'] = false;
               objResult['message'] = err.message;
       return  objResult ;     
    });

    //return from(objResult);
    return objResult;

  }

 

  /* END - CAMPAIGN PERIODS COSECHA  */ 




}