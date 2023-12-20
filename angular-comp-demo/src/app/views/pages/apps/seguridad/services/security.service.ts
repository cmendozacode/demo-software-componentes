import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of ,from} from 'rxjs';
 
import { HttpUtilsService } from '../../../../../core/_base/crud';
import { environment } from '../../../../../../environments/environment';



@Injectable({
    providedIn: 'root',
  })
export class SecurityService {

    private readonly baseSecurityUrl:string = environment.apiGlobalSecurity;
    private headers:HttpHeaders; 

    constructor(private http: HttpClient,private httpUtils:HttpUtilsService) {
        this.headers = this.httpUtils.getHTTPHeaders();
    }


  /* BEGIN - Obtener Paramestros para Query */
  
   public getHttpParamsGetUsers(objCurrentUser):any
   {
     var objResponse = {};

     objResponse['url'] = this.baseSecurityUrl;
 
    var objBody = {'object_parameters':{'company_id': objCurrentUser['company_id'] , 'user_name':'%'+':PARAM_USER_NAME'+'%'}};
    var objHeader = {'user_name': objCurrentUser['user_name'],'company_id':''+ objCurrentUser['company_id'],'user_token_session': objCurrentUser['token_session']};
        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['object_name'] = 'security.user_all';
        objHeader['http_method'] = 'GET';

    objResponse['header'] = objHeader;
    objResponse['body']   = objBody;
    objResponse['params'] = [];
   // objResponse['params'] = [{  "type":"search", "name":"patron" },{ "type":"value", "name":"format1" ,"value":"JSON" }];
    objResponse['paramsbody'] =  [{  "type":"search", "name":"object_parameters.user_name","replacevalue":"PARAM_USER_NAME" }];


   return objResponse;
   }


   public getHttpParamsGetModules(objCurrentUser):any
   {
     var objResponse = {};

     objResponse['url'] = this.baseSecurityUrl;
 
    var objBody = {'object_parameters':{'company_id':[0, objCurrentUser['company_id']] ,'software_product_id':  environment.softwareProductId , 'code':'%'+':PARAM_SEARCH_CODE'+'%', 'name':'%'+':PARAM_SEARCH_NAME'+'%'}};
    var objHeader = {'user_name': objCurrentUser['user_name'],'company_id':''+ objCurrentUser['company_id'],'user_token_session': objCurrentUser['token_session']};
        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['object_name'] = 'security.sys_software_module_in';
        objHeader['http_method'] = 'GET';

    objResponse['header'] = objHeader;
    objResponse['body']   = objBody;
    objResponse['params'] = [];
   
    objResponse['paramsbody'] =  [{  "type":"search", "name":"object_parameters.code","replacevalue":"PARAM_SEARCH_CODE" },
                                  {  "type":"search", "name":"object_parameters.name","replacevalue":"PARAM_SEARCH_NAME" }];

   return objResponse;
   }



   


   public getHttpParamsGetMenus(objCurrentUser):any
   {
     var objResponse = {};

     objResponse['url'] = this.baseSecurityUrl;
 
    var objBody = {'object_parameters':{'company_id':[0,objCurrentUser['company_id']] , 'code':'%'+':PARAM_SEARCH_CODE'+'%', 'name':'%'+':PARAM_SEARCH_NAME'+'%'}};
    var objHeader = {'user_name': objCurrentUser['user_name'],'company_id':''+ objCurrentUser['company_id'],'user_token_session': objCurrentUser['token_session']};
        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['object_name'] = 'security.sys_software_menu_in';
        objHeader['http_method'] = 'GET';

    objResponse['header'] = objHeader;
    objResponse['body']   = objBody;
    objResponse['params'] = [];
   
    objResponse['paramsbody'] =  [{  "type":"search", "name":"object_parameters.code","replacevalue":"PARAM_SEARCH_CODE" },
                                  {  "type":"search", "name":"object_parameters.name","replacevalue":"PARAM_SEARCH_NAME" }];


   return objResponse;
   }




   public getHttpParamsGetRole(objCurrentUser):any
   {
     var objResponse = {};

     objResponse['url'] = this.baseSecurityUrl;
 
    var objBody = {'object_parameters':{'company_id':[0,objCurrentUser['company_id']] , 'code':'%'+':PARAM_SEARCH_CODE'+'%', 'name':'%'+':PARAM_SEARCH_NAME'+'%'}};
    var objHeader = {'user_name': objCurrentUser['user_name'],'company_id':''+ objCurrentUser['company_id'],'user_token_session': objCurrentUser['token_session']};
        objHeader['Content-Type'] = 'application/json';
        objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
        objHeader['object_name'] = 'security.sec_software_role_in';
        objHeader['http_method'] = 'GET';

    objResponse['header'] = objHeader;
    objResponse['body']   = objBody;
    objResponse['params'] = [];
   
    objResponse['paramsbody'] =  [{  "type":"search", "name":"object_parameters.code","replacevalue":"PARAM_SEARCH_CODE" },
                                  {  "type":"search", "name":"object_parameters.name","replacevalue":"PARAM_SEARCH_NAME" }];


   return objResponse;
   }



  /* END - Obtener Paramestros para Query */






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










  /* BEGIN - USUARIOS */ 
    public getSearchUsers(objBody:any, objHeader:any): any {
         //Load Datos
         var objResult = this.getSearchObject(objBody,objHeader,'security.user_all');
      return objResult;
    }

    
      
   //Save New User
   public saveNewUser(objBody:any, objHeader:any): any {

    var objDataUser = objBody['object_parameters'];
    var objBodyQuery = {'object_parameters':{'company_id': objDataUser['company_id'] , 'user_name':objDataUser['user_name']}};

    //Load Datos
    var objResult = Promise.resolve()
    .then((res) => { 

      var objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.user_all')
                            .then((response) =>  { return response; }) 
                            .catch((err) => {throw new Error(err.error +' - '+ err.message); });

      return objResponse;
    })
    .then((res) => { 

      var flagFoundUser = Object.keys(res).length;  
      var responseUser = {};
      if( flagFoundUser > 0 )
        { responseUser['message'] = 'txtuseralreadyexists'; 
          responseUser['requestcomplete'] = false; }
      else
       {    
        responseUser = this.saveObjectRequest(objBody,objHeader,'security.user_all','POST');
       }

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


   //Save New User
   public saveUdatedUser(objBody:any, objHeader:any): any {
 
 
    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 
    
      var responseUser = {};     
          responseUser = this.saveObjectRequest(objBody,objHeader,'security.user_all','PUT');

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

  /* END - USUARIOS */ 

















  /* BEGIN - USER GROUP */ 
 


public getSearchUserGroup(objBody:any, objHeader:any): any {

    //Load Datos
    var objResult = this.getSearchObject(objBody,objHeader,'security.sec_group_user_all');

    return objResult;
  }




  public saveNewUserGroup(objBody:any, objHeader:any): any {

    var objDataUser = objBody['object_parameters'];
    var objBodyQuery = {'object_parameters':{'company_id': objDataUser['company_id'] , 'code':objDataUser['code']}};

    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 

      var objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sec_group_user_all')
                            .then((response) =>  { return response;  })
                            .catch((err) => {throw new Error(err.error +' - '+ err.message); });

      return objResponse;
    })
    .then((res) => { 

      var flagFoundObject = Object.keys(res).length;  
      var responseObject = {};
      if( flagFoundObject > 0 )
        { responseObject['message'] = 'txtcodealreadyexists'; 
          responseObject['requestcomplete'] = false; }
      else
       { responseObject = this.saveObjectRequest(objBody,objHeader,'security.sec_group_user_all','POST'); }

      return responseObject;
    })
    .then((res) => { 
        console.log('Final de Proceso::');
        return res;
    })
    .catch((err) => {
           
           var objResult = {};
            objResult['requestcomplete'] = false;
            objResult['message'] = err.message;
            return objResult;     
    });

    //return from(objResult);
    return objResult;

  }



  public saveUdatedUserGroup(objBody:any, objHeader:any): any {
 
    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 
    
      var responseObject = {};     
          responseObject = this.saveObjectRequest(objBody,objHeader,'security.sec_group_user_all','PUT');    

      return responseObject;
    })
    .then((res) => { 
        console.log('Final de Proceso::');
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









  public getSearchUserGroupDetail(objBody:any, objHeader:any): any {

    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 

      var objResponse = this.getSearchObjectBase(objBody,objHeader,'security.sec_group_user_item_all');
 
      return objResponse;
    })
    .then((res) => { 
        var objUsersIds = [];        
        var listItemsUserGroup = res['data'];

        listItemsUserGroup.forEach(element => { objUsersIds.push(element['user_id']); });

        var lsizeugrpitems = Object.keys(objUsersIds).length;

        var objParams = objBody['object_parameters'];
        var objBodyQuery = {'object_parameters':{'company_id': objParams['company_id'] , 'id':objUsersIds}};
        var objResponse = null;
        
        if( lsizeugrpitems > 0 )
        {
         objResponse =  this.getObjectRequest(objBodyQuery,objHeader,'security_user_query_in')
         .then((response) =>  {
          var lsize = Object.keys(response).length;
          var lusers = response;

          listItemsUserGroup.forEach(eitemgroup => {
              for(var i=0; i<lsize;i++){ if(lusers[i]['id'] == eitemgroup['user_id']){ eitemgroup['user'] = lusers[i]; break;} }                
          });

          var objResult = {};
              objResult['data'] = listItemsUserGroup;
              objResult['requestcomplete'] = true;
              objResult['message'] = 'ok';    
          return objResult;
         })
         .catch((err) => {throw new Error(err.error +' - '+ err.message); });
        
      }
      else{ objResponse = res;  }
        
        
        return objResponse;
      })    
    .then((res) => { 
      return res;
    })
    .catch((err) => {
           var objResult = {};
               objResult['requestcomplete'] = false;
               objResult['message'] = err.message;
            return  objResult ; 
    });

    return objResult;
  }







  //Save New User
  public saveUserGroupItem(objBody:any, objHeader:any, httpMethod:any): any {
   
    var objData = objBody['object_parameters'];
        if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }
    var objBodyQuery = {'object_parameters':{'company_id': objData['company_id'] , 'user_id':objData['user_id'] , 'group_user_id':objData['group_user_id'] }};

    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){ 
        
        objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sec_group_user_item_all')
                         .then((response) =>  { return response;  })
                         .catch((err) => {throw new Error(err.error +' - '+ err.message); });
      }

      return objResponse;

    }) 
    .then((res) => { 
    
      var flagFoundUser = Object.keys(res).length;  
      var responseUser = {};

      if( httpMethod == 'PUT' )
      { for(var i=0;i<flagFoundUser;i++){ if(res[i]['id'] == objData['id'] && res[i]['user_id'] == objData['user_id'] ){ flagFoundUser = 0; break; } }
        for(var i=0;i<flagFoundUser;i++){ if(res[i]['id'] != objData['id'] && res[i]['user_id'] == objData['user_id'] ){ flagFoundUser = 1; break; } } 
      }
    
      if( httpMethod == 'DELETE' ){  flagFoundUser = 0; }

      if( flagFoundUser > 0 )
        { responseUser['message'] = 'txtusergroupuseralreadyexists'; 
          responseUser['requestcomplete'] = false; }
      else
       { responseUser = this.saveObjectRequest(objBody,objHeader,'security.sec_group_user_item_all',httpMethod); }

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
          return  objResult; 
    });

    //return from(objResult);
    return objResult;
  }

 


  /* END - USER GROUP */ 





















  /* BEGIN - LEGAL COMPANY */ 


public getLegalCompany(objBody:any, objHeader:any): any {

  //Load Datos
  var objResult = this.getSearchObject(objBody,objHeader,'security.legal_company_all');
  return objResult;
}


  //Save New LegalCompany
  public saveLegalCompany(objBody:any, objHeader:any, httpMethod:any): any {

    var objData = objBody['object_parameters'];
      if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }
    var objBodyQuery = {'object_parameters':{ 'company_id': objData['company_id'], 'code':objData['code'] }};

    //Load Datos
    var objResult = Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){
        objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.legal_company_all')
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
       { responseUser =  this.saveObjectRequest(objBody,objHeader,'security.legal_company_all',httpMethod); }

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

 

  /* END - LEGAL COMPANY  */ 


























  /* BEGIN - ROLES */ 

 


public getRoles(objBody:any, objHeader:any): any {

  objBody['object_parameters']['software_product_id'] =  environment.softwareProductId ;

  //Load Datos
  var objResult=   Promise.resolve()
  .then((res) => { 
    var objBodyGen = JSON.parse(JSON.stringify(objBody));
        objBodyGen['object_parameters']['company_id'] = 0;
    var objResponse = this.getSearchObjectBase(objBodyGen,objHeader,'security.sec_software_role_all');
 
    return objResponse;
  })  
  .then((res) => { 
    var listRoleBase = res['data'];

    if(!res['data']){listRoleBase=[];}

    var objResponse =  this.getObjectRequest(objBody,objHeader,'security.sec_software_role_all')
                           .then((response) =>  { var newArray = listRoleBase.concat(response);
                               var objResult = {};
                                   objResult['data'] = newArray;
                                   objResult['requestcomplete'] = true;
                                   objResult['message'] = 'ok';    
                            return objResult;
                             })
                           .catch((err) => {throw new Error(err.error +' - '+ err.message); });   

    return objResponse;
  })
  .then((res) => { 

    console.log('Final consulta Roles');
    console.log(res);

    return res;

  })
  .catch((err) => { 
         var objResult = {};
             objResult['requestcomplete'] = false;
             objResult['message'] = err.message;
          return  objResult ; 
  });

  return objResult;
}




  //Save New Roles
  public saveRoles(objBody:any, objHeader:any, httpMethod:any): any {

    objBody['object_parameters']['software_product_id'] =  environment.softwareProductId ;

    var objData = objBody['object_parameters'];
    if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }
    var objBodyQuery = {'object_parameters':{'company_id': objData['company_id'],'software_product_id':  environment.softwareProductId , 'code':objData['code'] }};

    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){
        objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sec_software_role_all')
                          .then((response) =>  { return response;  })
                          .catch((err) => {throw new Error(err.error +' - '+ err.message);  }); 
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
       { responseUser =  this.saveObjectRequest(objBody,objHeader,'security.sec_software_role_all',httpMethod); }

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

 
    return objResult;
  }



  /* END - ROLES */ 

































  /* BEGIN - ROLE ITEN */
 
  
  public getRolesGrant(objBody:any, objHeader:any): any {
 
    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => {   
         var objResponse = this.getSearchObjectBase(objBody,objHeader,'security.sec_software_role_grant_all');
      return objResponse;  
    })
.then((res) => {
  
  var objListData = res['data'];
  var listModuleIds = []; var lsizemodulo = 0;
  var listMenuIds = [];  

  objListData.forEach(element => {
      if( element['software_module_id'] != null ){ listModuleIds.push(element['software_module_id']); lsizemodulo++; }
      if( element['software_menu_id'] != null ){ listMenuIds.push(element['software_menu_id']);  }    
     });
   
  var objBodyQuery = {'object_parameters':{'id': listModuleIds,'software_product_id':  environment.softwareProductId }};
 
  var objResponse = null;

  if( lsizemodulo > 0 )
  {
  objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sys_software_module_in')
  .then((response) =>  {         

     var lsize =  Object.keys(response).length;
     if(lsize >0)
     {
      objListData.forEach(element => {
        for(var i=0;i<lsize;i++){
            if( element['software_module_id'] == response[i]['id'] ){ element['module'] = response[i];  element['module_currentvalue'] = response[i]['name'];}
          }
       });
     }  

      var objResult = {};
          objResult['data'] = objListData;
          objResult['listmenuId'] = listMenuIds;
          objResult['requestcomplete'] = true;
          objResult['message'] = 'ok';    
      return objResult;
  })
  .catch((err) => {throw new Error(err.error +' - '+ err.message);  });
  }
  else{ objResponse = res; }
   

  return objResponse;
})
.then((res) => {
  
  var objListData = res['data'];
  var listMenuIds = [];
  if(res['listmenuId'] != null ) {listMenuIds = res['listmenuId'];}

  var lsizemenu = 0; lsizemenu = Object.keys(listMenuIds).length;
 
  var objBodyQuery = {'object_parameters':{'id': listMenuIds,'software_product_id':  environment.softwareProductId }};
 
  var objResponse = null;

  if( lsizemenu > 0 )
  {
  objResponse =  this.getObjectRequest(objBodyQuery,objHeader,'security.sys_software_menu_in')
  .then((response) =>  {   
    
    var lsize =  Object.keys(response).length;
    if(lsize >0)
    {
     objListData.forEach(element => {
       for(var i=0;i<lsize;i++){
           if( element['software_menu_id'] == response[i]['id'] ){ element['menu'] = response[i];  element['menu_currentvalue'] = response[i]['name'];}
         }
      });
    }  

      var objResult = {};
          objResult['data'] = objListData;
          objResult['requestcomplete'] = true;
          objResult['message'] = 'ok';    
      return objResult;
  })
  .catch((err) => {throw new Error(err.error +' - '+ err.message);  });
  }
  else{ objResponse = res; }

  return objResponse;
})
    .then((res) => { 
  
      console.log('Final consulta Detalle Grants');
      console.log(res);
  
      return res;
  
    })
    .catch((err) => {
           var objResult = {};
               objResult['requestcomplete'] = false;
               objResult['message'] = err.message;
            return  objResult ; 
    });
  
    return objResult;
  }

  



  //Save New Roles
  public saveRolesGrant(objBody:any, objHeader:any, httpMethod:any): any {

    objBody['object_parameters']['software_product_id'] =  environment.softwareProductId ;
    
    var objData = objBody['object_parameters'];
    if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }

    var objBodyQuery = {'object_parameters':{'software_role_id':objData['software_role_id']
                                             ,'software_module_id':objData['software_module_id']                                             
                                             ,'software_product_id':  environment.softwareProductId }};

    if( objData['software_menu_id'] != null && objData['software_menu_id'] != undefined )
      { objBodyQuery['object_parameters']['software_menu_id'] = objData['software_menu_id']; }                                                 

    //Load Datos
    var objResult = Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){
        objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sec_software_role_grant_all')
                          .then((response) => { return response; })
                          .catch((err) => {throw new Error(err.error +' - '+ err.message);  }); 
      }

      return objResponse;
    })
    .then((res) => { 

      var flagFoundUser = 0;
      var lsize = Object.keys(res).length;  
      var responseUser = {};

      if( httpMethod == 'POST' )
      { for(var i=0;i<lsize;i++){ 
                 if(   res[i]['software_module_id'] == objData['software_module_id'] 
                    && (res[i]['software_menu_id'] == objData['software_menu_id'] 
                       || ( res[i]['software_menu_id'] == null && (objData['software_menu_id'] == null || objData['software_menu_id'] == undefined ) ) 
                       )
                    ){ flagFoundUser = 1; break; }  } 
      }

      if( httpMethod == 'PUT' )
       { for(var i=0;i<lsize;i++){ 
                if(   res[i]['id'] == objData['id'] &&  res[i]['software_module_id'] == objData['software_module_id'] 
                && ( res[i]['software_menu_id'] == objData['software_menu_id'] 
                   || ( res[i]['software_menu_id'] == null && (objData['software_menu_id'] == null || objData['software_menu_id'] == undefined ) ) 
                   ) 
                  ){ flagFoundUser = 0; break; }  }

         for(var i=0;i<lsize;i++){ 
                if(   res[i]['id'] != objData['id'] &&  res[i]['software_module_id'] == objData['software_module_id'] 
                  && (res[i]['software_menu_id'] == objData['software_menu_id'] 
                     || ( res[i]['software_menu_id'] == null && (objData['software_menu_id'] == null || objData['software_menu_id'] == undefined ) )
                     ) 
                  ){ flagFoundUser = 1; break; }  }
       }
    
      if( httpMethod == 'DELETE' ){  flagFoundUser = 0; }

      if( flagFoundUser > 0 )
        { responseUser['message'] = 'txtrecordalreadyexists'; 
          responseUser['requestcomplete'] = false; }
      else
       { responseUser = this.saveObjectRequest(objBody,objHeader,'security.sec_software_role_grant_all',httpMethod); }

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

 
    return objResult;

  }

 


  /* END - ROLE ITEN */



  


























  /* BEGIN - ROLE  ASIGN GROUP USER ITEN */

  public postRoleGroupUser(objBody:any, objHeader:any,httpMethod:any): any {

    objHeader['Content-Type'] = 'application/json';
    objHeader['x-api-key'] = environment.apiGlobalSecurityKey;
    objHeader['object_name'] = 'security.sec_role_group_user_asg_all';
    objHeader['http_method'] = httpMethod;
  
    var varHeader = new HttpHeaders(objHeader);
  
    return this.http.post<any>(this.baseSecurityUrl, objBody, {headers: varHeader}).toPromise();
  } 
  




  
  public getRoleGroupUser(objBody:any, objHeader:any): any {
 
    //Load Datos
    var objResult=   Promise.resolve()
    .then((res) => {  
      var objResponse = this.getSearchObjectBase(objBody,objHeader,'security.sec_role_group_user_asg_all');
       return objResponse;  
    })
.then((res) => {
  
  var objListData = res['data'];
  var listRoleIds = []; var lsizerole = 0;
  var listMenuIds = [];  

  objListData.forEach(element => {
      if( element['software_role_id'] != null ){ listRoleIds.push(element['software_role_id']); lsizerole++; }  
     });
   
  var objBodyQuery = {'object_parameters':{'id': listRoleIds,'software_product_id':  environment.softwareProductId }};
 
  var objResponse = null;

  if( lsizerole > 0 )
  {
  objResponse = this.getObjectRequest(objBodyQuery,objHeader,'security.sec_software_role_in')
  .then((response) =>  {         

     var lsize =  Object.keys(response).length;
     if(lsize >0)
     {
      objListData.forEach(element => {
        for(var i=0;i<lsize;i++){
            if( element['software_role_id'] == response[i]['id'] ){ element['role'] = response[i];  element['role_currentvalue'] = response[i]['name'];}
          }
       });
     }  

      var objResult = {};
          objResult['data'] = objListData;       
          objResult['requestcomplete'] = true;
          objResult['message'] = 'ok';    
      return objResult;
  })
  .catch((err) => {throw new Error(err.error +' - '+ err.message);  });
  }
  else{ objResponse = res; }
   
  return objResponse;
})
.then((res) => { 
 
      return res;
  
    })
    .catch((err) => {
           var objResult = {};
               objResult['requestcomplete'] = false;
               objResult['message'] = err.message;
            return  objResult ; 
    });
  
    return objResult;
  }

  



  //Save New Role Group user
  public saveRoleGroupUser(objBody:any, objHeader:any, httpMethod:any): any {

    objBody['object_parameters']['software_product_id'] =  environment.softwareProductId ;

    var objData = objBody['object_parameters'];
    if( httpMethod == 'PUT' ){ objData = objBody['object_put_parameters']; }
    var objBodyQuery = {'object_parameters':{'software_role_id':objData['software_role_id'] , 'group_user_id':objData['group_user_id'] }};

    //Load Datos  
    var objResult = Promise.resolve()
    .then((res) => { 

      var objResponse = [];
      
      if( httpMethod != 'DELETE' ){
        objResponse =  this.getObjectRequest(objBodyQuery,objHeader,'security.sec_role_group_user_asg_all')
                          .then((response) =>  { return response;  })
                          .catch((err) => {throw new Error(err.error +' - '+ err.message);  }); 
      }

      return objResponse;

    })
    .then((res) => { 

      var flagFoundUser = Object.keys(res).length;  
      var responseUser = {};

      if( httpMethod == 'PUT' )
        { for(var i=0;i<flagFoundUser;i++){ if(res[i]['id'] == objData['id'] && res[i]['software_role_id'] == objData['software_role_id'] ){ flagFoundUser = 0; break; }  } 
          for(var i=0;i<flagFoundUser;i++){ if(res[i]['id'] != objData['id'] && res[i]['software_role_id'] == objData['software_role_id'] ){ flagFoundUser = 1; break; }  } 
        }
    
      if( httpMethod == 'DELETE' ){  flagFoundUser = 0; }

      if( flagFoundUser > 0 )
        { responseUser['message'] = 'txtrolegroupuseralreadyexists'; 
          responseUser['requestcomplete'] = false; }
      else
       { responseUser = this.saveObjectRequest(objBody,objHeader,'security.sec_role_group_user_asg_all',httpMethod); }

      return responseUser;
    })
    .then((res) => {         
        return res;
    })
    .catch((err) => {           
      var objResult = {};
          objResult['requestcomplete'] = false;
          objResult['message'] = err.message;
          return  objResult ; 
    });
    
    return objResult;
  }










  /* END - ROLE  ASIGN GROUP USER ITEN */



}