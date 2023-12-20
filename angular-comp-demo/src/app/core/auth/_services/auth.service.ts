import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of ,from} from 'rxjs';
import { User } from '../_models/user.model';
import { HttpUtilsService } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

import * as jquery from 'jquery';
import {request} from 'request';

@Injectable()
export class AuthService {

    private readonly baseSecurityUrl:string = environment.apiGlobalSecurity ;
    private readonly baseUrl:string = environment.api + 'login';
    private headers:HttpHeaders;

    constructor(private http: HttpClient,private httpUtils:HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }

    // Authentication/Authorization
    login(usuarioLogin: string, usuarioPassword: string): Observable<any> {

        
       var varHeader = new HttpHeaders({'Content-Type': 'application/json','x-api-key': environment.apiGlobalSecurityKey,'custom_method':'login'});
  
        //var varBody = {"object_parameters":{ "user_name":"cmendoza", "password":"textopassword",  "status":true}};
        var varBody = {"object_parameters":{ "user_name":usuarioLogin, "password":usuarioPassword,  "status":true}};


     //Load Datos
      var objResult=   Promise.resolve()
        .then((res) => { 
            
            var responseLogon = this.http.post<any>(this.baseSecurityUrl, varBody, {headers: varHeader}).toPromise()
            .then((response) =>  {

                if( response['id'] == null || response['id'] == undefined || response['auth_status'] == false )
                { throw new Error( response['auth_message'] ); }

                return response;         
            }); 

            return responseLogon;
        })		
		.then((res) => {
            var userDataObj = res;

            var objBody = {'object_parameters':{'user_id':userDataObj['id'],'company_id':userDataObj['company_id']}};
			var objHeader = {'user_name':userDataObj['user_name'],'company_id':''+userDataObj['company_id'],'user_token_session':userDataObj['token_session']};

			var objResponse = this.getSoftwareSystems(objBody,objHeader).toPromise()
			.then((response) =>  {
                var objResult = {};
                objResult['user_data'] = userDataObj;
                objResult['software_products'] = response;
				return objResult;
			}); 

			return objResponse;

        })
        .then((res) => {
            var objDataSoftwareList = res['software_products'];
            var userDataObj = res['user_data'];

            var objBody = {'object_parameters':{'company_id':userDataObj['company_id'], 'status':true}};
			var objHeader = {'user_name':userDataObj['user_name'],'company_id':''+userDataObj['company_id'],'user_token_session':userDataObj['token_session']};
           
			var objResponse = this.getCompanySedes(objBody,objHeader).toPromise()
			.then((response) =>  {
                var objResult = {};
                objResult['user_data'] = userDataObj;
                objResult['software_products'] = objDataSoftwareList;
                objResult['company_sedes'] = response;

				return objResult;
			}); 

			return objResponse;

        })		        		
		.then((res) => {

			var objDataSoftwareList = res['software_products'];
            var userDataObj = res['user_data'];

            var companySedesList = res['company_sedes'];

			var objBody = {'object_parameters':{'software_product_id':1,'user_id':userDataObj['id'],'company_id':userDataObj['company_id']}};
			var objHeader = {'user_name':userDataObj['user_name'],'company_id':''+userDataObj['company_id'],'user_token_session':userDataObj['token_session']};

			var objResponse = this.getSoftwareMenu(objBody,objHeader).toPromise()
			.then((response) =>  {               

               //BEGIN - Add Profile Web Access
               var listRoles = response['sec_software_role'];
               var listProfileWebAccess = [];
               var curProfileWebAccess = {};
               listRoles.forEach(eRol => {
                curProfileWebAccess = {'perfilAccesoID':eRol['id'],'perfilAccesoIDPadre':-1,'perfilAccesoTag':eRol['code'],'perfilAccesoNombre':eRol['name'],'perfilStatus':eRol['status']};
                listProfileWebAccess.push(curProfileWebAccess);
               });
               userDataObj['usuarioWebPerfiles'] = listProfileWebAccess;
               userDataObj['authToken'] = userDataObj['token_session'];
               //END - Add Profile Web Access
        
               //BEGIN Feed User Data
               userDataObj['usuarioNombre'] = userDataObj['full_name'];
               userDataObj['usuarioNombreCompleto'] = userDataObj['full_name'];
               userDataObj['fullname'] = userDataObj['full_name'];
                               
               var listCompanySedes = [];
               var cnt = 0;
               var curSelectEmpresa = true;
               companySedesList.forEach(eSede => {
                   if(cnt == 0){ curSelectEmpresa = true; }else{ curSelectEmpresa = false; }

                   var objSede = {empresaID: eSede['id'], empresaNombreCorto: eSede['name'],empresaRazonSocial: eSede['name'], empresaRUC: eSede['company_number'], empresaImagen: "hf.png", empresaSelect:curSelectEmpresa,empresaKeyCode:eSede['code']};
                   objSede['empresaCultivos']=[{}];
                   listCompanySedes.push(objSede);
                   cnt++;
               });
               userDataObj['usuarioEmpresas'] = listCompanySedes;
               //END Feed User Data
            
				var arrResult = {}
				arrResult['software_products'] = objDataSoftwareList;
                arrResult['user_data']         = userDataObj;
                 
                var objdata = response['sys_software_menu_final'];
				arrResult['software_menu']  = objdata
            
				return arrResult;
			}); 

			return objResponse;            
        })		
		.then((res) => {
	
			var vartempObject = JSON.stringify(res['user_data']);
            localStorage.setItem("sd_user_data",vartempObject);

			var vartempObject = JSON.stringify(res['software_products']);
            localStorage.setItem("sd_software_products",vartempObject);

			var vartempObject = JSON.stringify(res['software_menu']);
            localStorage.setItem("sd_software_sd_menu",vartempObject);			

            return res['user_data'];
        })
        .catch((err) => {
            var objResult = {};
            objResult['auth_status'] = false;
            objResult['message'] = err.message;
           
            return  objResult ;   

          console.log(err.message); // something bad happened      
        });



        return from(objResult);
        //return this.http.post<any>(this.baseUrl, {loginOutputUsuario:usuarioLogin, passwordOutputUsuario:usuarioPassword}, {headers: this.headers});
    }




    // Authentication/Authorization
    authSignOn(usuarioLogin: string, usuarioPassword: string): Observable<any> {
        var urlauth =  this.baseUrl + '/authsignon';
        return this.http.post<any>(urlauth, {loginOutputUsuario:usuarioLogin, passwordOutputUsuario:usuarioPassword}, {headers: this.headers});
    }    



    getSoftwareSystems(objBody:any, objHeader:any): Observable<any> {

        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['custom_method'] = 'securitysubscription';

        var varHeader = new HttpHeaders(objHeader);
        //var objRequest = new HttpRequest<any>('POST',this.baseSecurityUrl, objBody, {headers: varHeader});
        //return this.http.request<any>(objRequest);
        return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader});

    }



    getSoftwareMenu(objBody:any, objHeader:any): Observable<any> {

        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['custom_method'] = 'securitygrants';

        var varHeader = new HttpHeaders(objHeader);
        //var objRequest = new HttpRequest<any>('POST',this.baseSecurityUrl, objBody, {headers: varHeader});
        //return this.http.request<any>(objRequest);
        return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader});

    }    

    getCompanySedes(objBody:any, objHeader:any): Observable<any> {

        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['object_name'] = 'security.legal_company_all';
        objHeader['http_method'] = 'GET';

        var varHeader = new HttpHeaders(objHeader);

        return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader});
 
    }    




    getSoftwareGetAuthDEMOWEB(objBody:any, objHeader:any): Observable<any> {

        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['custom_method'] = 'singlesignon';
        objHeader['object_name'] = 'login_DEMOWEB';

        var varHeader = new HttpHeaders(objHeader);

        return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader});

    }    


    getUserByToken(): Observable<User> {  
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.headers.append('Authorization', 'Bearer ' + userToken);
        return this.http.post<User>(this.baseUrl+ `/getuser`, {authToken:userToken}, { headers: this.headers});
    }

 	/*
 	 * Handle Http operation that failed.
 	 * Let the app continue.
     *
	 * @param operation - name of the operation that failed
 	 * @param result - optional value to return as the observable result
 	 */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
}
