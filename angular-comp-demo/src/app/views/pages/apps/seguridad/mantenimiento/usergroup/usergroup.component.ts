import { Component,SimpleChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { MatDialog,MatDialogRef } from '@angular/material/dialog';


import { TranslationService } from '../../../../../../core/_base/layout';
import { LayoutUtilsService } from '../../../../../../core/_base/crud';
import { TranslateService } from '@ngx-translate/core';

//import {languageTagService} from './lib-components/languagetag-component/languagetag.component';
import {languageTagService} from '../../../../lib/lib-services/language-tag-service/language-tag.service';

import {DialogFormSearchInputComponent} from '../../../../lib/lib-components/htmlform-component/htmlform.component';
import {DialogTableSearchInputComponent} from '../../../../lib/lib-components/htmltable-component/htmltable.component';

import { currentUser, User } from '../../../../../../core/auth';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AppState } from '../../../../../../core/reducers';

import { SecurityService } from '../../services/security.service'



@Component({
    selector: 'yp-usergroup',
    templateUrl: './usergroup.component.html',
    styleUrls: []
  })
  export class UserGroupComponent implements OnInit{

    subscriptions: Subscription[] = [];
    usuario$: Observable<User> = this.store.pipe(select(currentUser));
    currentUser:any;

    progressflag:boolean = false;
    sectionrefresh:boolean = false;

    currentView:any = 'principal'

    currentLanguageTags:any={};
    objtablePageRowSize:any = 5;
    curTableHeadLineHeightPage:any=50;
    curTableLineHeightPage:any=40;

    searchBox:any=[];
    searchBoxData:any={};
    searchBoxFlagValidate:boolean =false;

    tableSearchBoxTitle:any='txttabletitlesearch';
    tableSearchBox:any=[];
    tableSearchBoxData:any=[];
    tableSearchBoxDataCurrentItem:any;

    viewform:any=[];

    newEditform:any=[];
    newEditformE:any=[];
    newEditformData:any={};
    newEditformFlagValidate:boolean = true;
 

    newEditformFlagShowMessageErr:boolean = false;
    newEditformFlagShowMessageOk:boolean = false;
    newEditformFlagValidateMessage:string='';

    objectCurrentItem:any;


    //Detalle Config
    tableDetailTitle:any='txttabletitledetail';
    tableDetailChanges:number=0;
    tableDetail:any=[];
    tableDetailData:any=[];
    tableDetailDataCurrentItem:any;

    //Detalle Config Roles
    tableDetailRoleTitle:any='txttabletitledetail';
    tableDetailRoleChanges:number=0;
    tableDetailRole:any=[];
    tableDetailRoleData:any=[];
    tableDetailRoleDataCurrentItem:any;



    constructor(private cd: ChangeDetectorRef,private languageTagSrv: languageTagService,public dialog: MatDialog,private translationService: TranslationService,
                private securitySrv: SecurityService,private store: Store<AppState>,
                private layoutUtilsService: LayoutUtilsService,
                private translate: TranslateService) {}

    ngOnInit(){
    
        var languageCurrent = this.translationService.getSelectedLanguage();

        var languageTags = this.languageTagSrv.fn_get_language_tags_ts(languageCurrent);

        this.currentLanguageTags = languageTags['data']['GENERICFORM'];

        //Define Search Box
        this.searchBox =[
            {"groupFields":"row1" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"text_search"  ,"fieldFormName":"pvusername" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtsearch",  "propertyTextLabel":"txtsearch", "visible":true , "required":false , "readonly":false, "fieldWidth":"300px"}
                         ]
            }
            ,
           {"groupFields":"row2" , "controlClass":"cssgroupform",
           "groupConfig":[
                   {"propertyName":"objblank" ,"fieldFormName":"pvblank" , "controlClass":"cssblankform", "controlType":"blank" ,  "propertyTextLabel":"txtname", "visible":true , "required":true , "readonly":false,  "fieldWidth":"200px"},
            ]
           }
        ];

        //Define Tabla de Busqueda
        this.tableSearchBox = [
            {"propertyName":"code" ,"fieldFormName":"pvcode" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtcode" , "propertyTextHolder" : "txtcode", "visible":true , "required":true , "readonly":false,"searchflag":true, "maxlength": 15, "fieldWidth":"150px"},
            {"propertyName":"name" ,"fieldFormName":"pvname" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtname" , "propertyTextHolder" : "txtname", "visible":true , "required":true , "readonly":false,"searchflag":true, "maxlength": 15, "fieldWidth":"250px"},            
            {"propertyName":"description"  ,"fieldFormName":"pvdescription" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtdescription" , "propertyTextHolder" : "txtdescription", "visible":false , "required":true , "readonly":false,"searchflag":false, "maxlength": 15, "fieldWidth":"150px"},            
            {"propertyName":"end_date"  , "fieldFormName":"pvenddate" , "controlClass":"cssinputform", "controlType":"label"   ,"controlSubType": "date"   , "propertyTextLabel" : "txtdate",   "visible":false , "buttontext":""  ,  "fieldWidth":"100px"}  ,  
            {"propertyName":"status"  , "fieldFormName":"pvflagstatus" , "controlClass":"cssinputform", "controlType":"label"  ,"controlSubType": "boolean" ,"controlTrueValue": "txtactive","controlFalseValue": "txtinactive"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} ,
            {"propertyName":"menuobj1" ,"fieldFormName":"menuobj1" , "controlClass":"cssinputform", "controlType":"menu",  "propertyTextLabel":"txttablemenuhead" , "propertyTextHolder" : "txttablemenuhead" ,"controlMenuView":false  ,"controlMenuEdit":true ,"controlMenuDelete":false ,"controlMenuSave":false, "visible":true , "readonly":false, "maxlength": 15, "fieldWidth":"50px"},
        ];

        //Define New Form
        this.newEditform =[
            {"groupFields":"row1" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"code"  ,"fieldFormName":"pvcode" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtcode",  "propertyTextLabel":"txtcode", "visible":true , "required":true , "readonly":false, "fieldWidth":"200px"}
                         ]
            },
            {"groupFields":"row2" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"name"  ,"fieldFormName":"pvname" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtname",  "propertyTextLabel":"txtname", "visible":true , "required":true , "readonly":false, "fieldWidth":"400px"}
                         ]
            }
            ,
            {"groupFields":"row3" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"description"  ,"fieldFormName":"pvdescription" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtdescription",  "propertyTextLabel":"txtdescription", "visible":true , "required":false , "readonly":false, "fieldWidth":"400px"}
                         ]
            }

            ,
            {"groupFields":"row5" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"start_date"  ,"fieldFormName":"pvstart_date" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "date"   , "propertyTextHolder" : "txtstartdate",  "propertyTextLabel":"txtstartdate", "visible":true , "required":false , "readonly":true, "fieldWidth":"200px"},
                   {"propertyName":"end_date"  ,"fieldFormName":"pvend_date" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "date"   , "propertyTextHolder" : "txtenddate",  "propertyTextLabel":"txtenddate", "visible":true , "required":false , "readonly":true, "fieldWidth":"200px"}
                         ]
            }

            ,
            {"groupFields":"row6" , "controlClass":"cssgroupform",
            "groupConfig":[
                    {"propertyName":"status"      , "fieldFormName":"pvflagenabled" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "checkbox"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} 
                         ]
            }

            ,
           {"groupFields":"row8" , "controlClass":"cssgroupform",
            "groupConfig":[
                    {"propertyName":"objblank" ,"fieldFormName":"pvblank" , "controlClass":"cssblankform", "controlType":"blank" ,  "propertyTextLabel":"txtname", "visible":true , "required":true , "readonly":false,  "fieldWidth":"200px"},
                       ]
           }

            ,
            {"groupFields":"row4" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"id"  ,"fieldFormName":"pvid" , "controlClass":"cssinputform", "controlType":"hidden"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtpassword",  "propertyTextLabel":"txtpassword", "visible":false , "required":false , "readonly":false, "fieldWidth":"250px"},
                   {"propertyName":"company_id"  ,"fieldFormName":"pvrepeat_passowrd" , "controlClass":"cssinputform", "controlType":"hidden"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtrepeatpassword",  "propertyTextLabel":"txtrepeatpassword", "visible":false , "required":false , "readonly":false, "fieldWidth":"250px"}
                         ]
            }

        ];

        this.newEditformE = JSON.parse(JSON.stringify(this.newEditform));
        this.newEditformE[0]['groupConfig'][0]['readonly']=true;


        //Define View Form
        this.viewform =[
            {"groupFields":"row1" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"code"  ,"fieldFormName":"pvcode" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtcode",  "propertyTextLabel":"txtcode", "visible":true , "required":false , "readonly":true, "fieldWidth":"200px"}
                         ]
            },
            {"groupFields":"row2" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"name"  ,"fieldFormName":"pvname" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtname",  "propertyTextLabel":"txtname", "visible":true , "required":false , "readonly":true, "fieldWidth":"400px"}
                         ]
            }
        ];

        this.tableDetailData = [];



      this.subscriptions.push(
            combineLatest([this.usuario$ ]).subscribe(([resUsuario]) => {
              this.currentUser = resUsuario;


        //Define Tabla de Detalle
        var datatable02strct = [{ "propertyName":"user_name", "propertyValue":"user_name","fieldFormName":"pvusername", "propertyTextLabel":"txtusername", "visible":true ,  "fieldWidth":"100px" }
        ,{ "propertyName":"full_name", "propertyValue":"full_name","fieldFormName":"pvfullname", "propertyTextLabel":"txtfullname", "visible":true ,  "fieldWidth":"200px" }];

        
        var objRequestParams = this.securitySrv.getHttpParamsGetUsers(this.currentUser);

        var datastructureAPI ={"urlGateWay":objRequestParams['url'] ,
        "httpHeader":objRequestParams['header'], 
        "params":objRequestParams['params'],
        "paramsbody":objRequestParams['paramsbody'],
        "body":objRequestParams['body'],
        "httpMethod":'POST'};

        this.tableDetail = [            
            {"propertyName":"user" , "fieldFormName":"plobjuser" , "controlClass":"cssinputsearchform", "controlType":"searchinput" , "propertyTextLabel" : "txtusername","searchflag":true,   "visible":true , "required":true, "readonly":true,  "fieldWidth":"300px","propertyTextTitle":"txtsearchcontrol", "collectionData":[], "selectedDataFieldView":"user_name", "structureData":datatable02strct, "enableDataApi":true,"tablePageRowSize":5 ,"tableLineHeightPage":38,"structureDataApi":datastructureAPI ,"searchModelWidth":"550px","searchModelHeight":"485px"} ,

            {"propertyName":"status"  , "fieldFormName":"pvflagstatus" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "checkbox"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} ,
            {"propertyName":"menuobj1" ,"fieldFormName":"menuobj1" , "controlClass":"cssinputform", "controlType":"menu",  "propertyTextLabel":"txttablemenuhead" , "propertyTextHolder" : "txttablemenuhead" ,"controlMenuView":false  ,"controlMenuEdit":false ,"controlMenuDelete":true ,"controlMenuSave":true, "visible":true , "readonly":false, "maxlength": 15, "fieldWidth":"50px"},
        ];


        //Define Tabla de Detalle
        var datatable03strct = [{ "propertyName":"code", "propertyValue":"code","fieldFormName":"pvcode", "propertyTextLabel":"txtcode", "visible":true ,  "fieldWidth":"100px" }
        ,{ "propertyName":"name", "propertyValue":"name","fieldFormName":"pvname", "propertyTextLabel":"txtname", "visible":true ,  "fieldWidth":"200px" }];

        
        var objRequestParamsRole = this.securitySrv.getHttpParamsGetRole(this.currentUser);

        var datastructureAPIRole ={"urlGateWay":objRequestParamsRole['url'] ,
        "httpHeader":objRequestParamsRole['header'], 
        "params":objRequestParamsRole['params'],
        "paramsbody":objRequestParamsRole['paramsbody'],
        "body":objRequestParamsRole['body'],
        "httpMethod":'POST'};

        this.tableDetailRole = [            
            {"propertyName":"role" , "fieldFormName":"plobjuser" , "controlClass":"cssinputsearchform", "controlType":"searchinput" , "propertyTextLabel" : "txtrole","searchflag":true,   "visible":true , "required":true, "readonly":true,  "fieldWidth":"300px","propertyTextTitle":"txtsearchcontrol", "collectionData":[], "selectedDataFieldView":"code", "structureData":datatable03strct, "enableDataApi":true,"tablePageRowSize":5 ,"tableLineHeightPage":38,"structureDataApi":datastructureAPIRole ,"searchModelWidth":"550px","searchModelHeight":"485px"} ,

            {"propertyName":"status"  , "fieldFormName":"pvflagstatus" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "checkbox"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} ,
            {"propertyName":"menuobj1" ,"fieldFormName":"menuobj1" , "controlClass":"cssinputform", "controlType":"menu",  "propertyTextLabel":"txttablemenuhead" , "propertyTextHolder" : "txttablemenuhead" ,"controlMenuView":false  ,"controlMenuEdit":false ,"controlMenuDelete":true ,"controlMenuSave":true, "visible":true , "readonly":false, "maxlength": 15, "fieldWidth":"50px"},
        ];







              this.cd.detectChanges();   
        }),
       );
 
    }    

    ngOnChanges(changes: SimpleChanges) {   
        var languageCurrent = this.translationService.getSelectedLanguage();
        var languageTags = this.languageTagSrv.fn_get_language_tags_ts(languageCurrent);

        this.currentLanguageTags = languageTags['data']['GENERICFORM']; 
        this.cd.detectChanges();
     }


  //Recover Data from Form
  getSearchBoxData(dataForm:any){
     this.searchBoxData = dataForm;
  }
   
  getSearchBoxValidation(dataForm:any){

    this.searchBoxFlagValidate = dataForm;  
     setTimeout(()=>{ this.searchBoxFlagValidate = false; }, 2000);
    
  }


  /*Datos Curren Table*/
  fn_getItemTableSearchBoxData(dataItemTable:any){
    this.tableSearchBoxDataCurrentItem = dataItemTable;

    //Evaluar Evento:
    if(this.tableSearchBoxDataCurrentItem['event']=='update')
    {  this.fn_edit_object(this.tableSearchBoxDataCurrentItem['data']); } 

  }




   //Eventos Formulario Nuevo e Edicion
      //Recover Data from Form
   getNewEditFormData(dataForm:any){ this.newEditformData= dataForm; }
   getNewEditFormValidation(dataForm:any){ this.newEditformFlagValidate = dataForm; }

  
  //Cambio de Pantalla
  fn_navigation(pv_viewname){
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
    this.currentView = pv_viewname; this.cd.detectChanges();
  } 



//Consulta de Usuarios
fn_Consultar(){
   this.newEditformFlagShowMessageOk = false;
   this.newEditformFlagShowMessageErr = false;  
   this.progressflag= true;
   var searchtxt = '' ;
   
   if( this.searchBoxData['text_search'] != null && this.searchBoxData['text_search'] != undefined)
   { searchtxt = this.searchBoxData['text_search']; }
    
   var objBody = {'object_parameters':{'company_id': this.currentUser['company_id'] , 'code':'%'+searchtxt+'%', 'name':'%'+searchtxt+'%'}};
   var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};

    this.securitySrv.getSearchUserGroup(objBody,objHeader).then(
    (response) => {

        if( response['requestcomplete'])
        { this.tableSearchBoxData = response['data'];   }
        else
        {  this.newEditformFlagShowMessageErr = true;  
           this.newEditformFlagValidateMessage = response['message'];  }

          this.progressflag= false;
          this.cd.detectChanges();   
      });

  }

  //Ir a la Pantalla de Nuevo
  fn_NuevoItem()
  {
    this.newEditformFlagValidate    = false;
    this.newEditformFlagShowMessageErr = false;

    var curdate = new Date();
    var datefrmstr = curdate.toISOString().substring(0, 10);

      var newitemobj = {};
          newitemobj['code'] = null;
          newitemobj['name'] = null;
          newitemobj['start_date'] = datefrmstr;
          newitemobj['status'] = true;

       this.newEditformData = newitemobj;

    this.currentView = 'new';
    this.cd.detectChanges();    
  }



  //Ir a Pantalla de Edicion
  fn_edit_object(objData)
  {
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
    
    objData = this.fn_set_data_to_form(objData);
     
    this.objectCurrentItem = objData;
    this.newEditformData  =  objData;

    this.currentView = 'edit';
    this.cd.detectChanges();
  }

  //Configurar datos para Formulario
  fn_set_data_to_form(objData)
  {
    var datefrmstr = '';

    if(objData['start_date'] != null && objData['start_date'] != undefined)
    {  datefrmstr = objData['start_date'].substring(0, 10);
       objData['start_date'] = datefrmstr;
    }

    if(objData['end_date'] != null && objData['end_date'] != undefined)
    {  datefrmstr = objData['end_date'].substring(0, 10);
       objData['end_date'] = datefrmstr;
    }

    return objData;
  }



  //Item Datos SAVE
  fn_save(){

    this.progressflag= true;

    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
  
    var flagValidateForm = true;
    var validateMessage = '';
    if( this.newEditformFlagValidate == false )
    {
      flagValidateForm = false;
      validateMessage = 'txtdatarequired';
      this.newEditformFlagValidateMessage = this.currentLanguageTags[validateMessage];
    }

    this.newEditformFlagShowMessageErr = !flagValidateForm; 
     
    if(!flagValidateForm){ this.progressflag = false; }

    if(this.currentView == 'new' && flagValidateForm)
    {  this.fn_save_new(objBody, objHeader);       }

    if(this.currentView == 'edit' && flagValidateForm)
    {  this.fn_save_updated(objBody, objHeader);   }
    
  }



  //Save New 
  fn_save_new(objBody, objHeader){
  
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();
  
    var objData = {};
        objData = {...this.newEditformData};
        objData['id'] =0;
        objData['company_id'] = this.currentUser['company_id'];

        if( objData['start_date'] != null &&  objData['start_date'] != undefined )
        { objData['start_date'] =  objData['start_date']+'T00:00:00.000Z';  }
    
        if( objData['end_date'] != null &&  objData['end_date'] != undefined )
        { objData['end_date'] =  objData['end_date']+'T00:00:00.000Z';  }            


       if( objData['status'] ){  objData['end_date'] = null; this.newEditformData['end_date'] = null;  }
       if( objData['status'] == false && objData['end_date'] == null) {  objData['end_date'] = datefrmstr; this.newEditformData['end_date'] = datefrmstr.substring(0, 10);  }

        objData['created_by']   = this.currentUser['user_name'];
        objData['created_date'] = datefrmstr;

        objBody['object_parameters'] = objData;


    this.securitySrv.saveNewUserGroup(objBody,objHeader).then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.currentView = 'edit';
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row(this.tableSearchBoxData,'id',response['data'],'POST');
                this.newEditformData = this.fn_set_data_to_form(response['data']); 
                
              }

              this.progressflag = false;
              this.cd.detectChanges();
          });
 
  }


 //Save Updated Object 
 fn_save_updated(objBody, objHeader){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();

    var objDataWhere = {};
        objDataWhere['id'] = this.newEditformData['id'];
        objDataWhere['company_id'] = this.newEditformData['company_id'];    

    var sourceData =  JSON.parse(JSON.stringify(this.newEditformData));      
    var objData = {};

    //Limpiar Todos los Nulos de Request
    for (const key in sourceData) {
        if( (sourceData[key] != null && sourceData[key] != undefined) 
         || ( key in {'start_date':1,'end_date':1,'code':1,'name':1,'description':1}  ) )
        { objData[key] = sourceData[key]; }        
    }
    
        
        objData['company_id'] = this.currentUser['company_id'];

        if( objData['start_date'] != null &&  objData['start_date'] != undefined )
        { objData['start_date'] =  objData['start_date']+'T00:00:00.000Z';  }
    
        if( objData['end_date'] != null &&  objData['end_date'] != undefined )
        { objData['end_date'] =  objData['end_date']+'T00:00:00.000Z';  }            

        if( objData['status'] ){  objData['end_date'] = null; this.newEditformData['end_date'] = null;  }
        if( objData['status'] == false && objData['end_date'] == null) {  objData['end_date'] = datefrmstr; this.newEditformData['end_date'] = datefrmstr.substring(0, 10);  }


        objData['last_updated_by']   = this.currentUser['user_name'];
        objData['last_updated_date'] = datefrmstr;

        objBody['object_put_parameters'] = objData;
        objBody['object_parameters'] = objDataWhere;
 

    this.securitySrv.saveUdatedUserGroup(objBody,objHeader).then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.currentView = 'edit';
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row(this.tableSearchBoxData,'id',objData,'PUT');
              }

              this.progressflag = false;
              this.cd.detectChanges();
          });
  }



  fn_update_table_row( table_object, fieldId, objData,http_method ){

    if( http_method == 'PUT' )
    { 
    var searchIndex = -1;
    var lsize = Object.keys(table_object).length;
    for(var i=0;i<lsize; i++){ if(objData[fieldId] == table_object[i][fieldId]){ searchIndex = i; break;} }
 
       if( searchIndex>-1 )
       {
         for (const key in objData) {
            if( (objData[key] != null && objData[key] != undefined) 
              || ( key in {'start_date':1,'end_date':1,'code':1,'name':1,'description':1}  ) 
              )
            { table_object[searchIndex][key] = objData[key]; }        
         }         
       }     
    }

    if(http_method == 'POST'){ table_object.push(objData); }

  }








  /*  Grupo Usuario  Detalle miembros */

    fn_go_to_detail(){
        this.newEditformFlagShowMessageOk = false;  
        this.newEditformFlagShowMessageErr = false;  
        this.progressflag= true;
        this.tableDetailData = [];
         
        var objBody = {'object_parameters':{'company_id': this.currentUser['company_id'] , 'group_user_id':this.newEditformData['id'] }};
        var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
     
         this.securitySrv.getSearchUserGroupDetail(objBody,objHeader).then(
         (response) => {
     
             if( response['requestcomplete'])
             { this.tableDetailData = response['data'];   }
             else
             {  this.newEditformFlagShowMessageErr = true;  
                this.newEditformFlagValidateMessage = response['message'];  }
     
               this.progressflag= false;
               this.cd.detectChanges();   
           });
      
        this.fn_navigation('objdetail');
        this.cd.detectChanges();
    }


    fn_NuevoItemDetail(){
        
        this.newEditformFlagValidate    = false;
        this.newEditformFlagShowMessageErr = false;
    
        var curdate = new Date();
        var datefrmstr = curdate.toISOString().substring(0, 10);
    
          var newitemdetobj = {};
              newitemdetobj['id'] = 0;
              newitemdetobj['user'] = {};                          
              newitemdetobj['status'] = true;

        //this.sectionrefresh = true;
        this.progressflag = true;
        
        setTimeout(()=>{  
            //  this.tableDetailData.push(newitemdetobj); 
              this.tableDetailData.unshift(newitemdetobj); 
              this.tableDetailChanges++; 
              this.progressflag= false;
              this.cd.detectChanges();
              //this.sectionrefresh = false;
            }, 300);
     
        

    }


    /*Datos Curren Table*/
    fn_getItemTableDetailData(dataItemTable:any){
        this.tableDetailDataCurrentItem = dataItemTable;
        //Evaluar Evento:
        if(this.tableDetailDataCurrentItem['event']=='save')
        {  this.fn_saveitem( this.tableDetailDataCurrentItem['data'] );  }

        if(this.tableDetailDataCurrentItem['event']=='delete')
        {            
          const dialogRef = this.layoutUtilsService.deleteElement(
            this.translate.instant('GENERICFORM.txtgroupuseritem'),
            this.translate.instant('QUESTION_DELETE.ONE' ),
            this.translate.instant('MESSAGE.WAIT')
          );

          dialogRef.afterClosed().subscribe((res) => {
            //Respuesta Cancelar
            if (!res) { return; }
            //Respuesta Ok
            this.fn_deleteitem( this.tableDetailDataCurrentItem['data'],this.tableDetailDataCurrentItem['idx'] );  
       
          });
           
        }
  
     }



  //Item Datos DELETE
  fn_deleteitem( currentObject ,idx ){

    this.progressflag= true;
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
  
    var flagValidateForm = true;
    var validateMessage = '';
 
    this.newEditformFlagShowMessageErr = !flagValidateForm; 

    if(!flagValidateForm){ this.progressflag = false; }
  
    if( currentObject['id'] > 0 && flagValidateForm)
    {  this.fn_save_delete_item(objBody, objHeader, currentObject);   }

    if( currentObject['id'] == 0 )
    { 
       this.tableDetailData.splice(idx, 1);  
       this.tableDetailChanges++; 
       this.progressflag= false;
       this.cd.detectChanges();
    }

    
  }


      
  //Item Datos SAVE
  fn_saveitem( currentObject ){

    this.progressflag= true;
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
  
    var flagValidateForm = true;
    var validateMessage = '';
 
    if( currentObject['user'] == null || currentObject['user'] == undefined || currentObject['user']['id'] == null || currentObject['user']['id'] == undefined )
    {  
      flagValidateForm = false;
      this.progressflag= false;
      validateMessage = 'txtdatarequired';
      this.newEditformFlagValidateMessage = this.currentLanguageTags[validateMessage];
    }

    this.newEditformFlagShowMessageErr = !flagValidateForm; 

    if(!flagValidateForm){ this.progressflag = false; }
   
    if( currentObject['id'] == 0 && flagValidateForm)
    {  this.fn_save_new_item(objBody, objHeader, currentObject);       }

    if( currentObject['id'] > 0 && flagValidateForm)
    {  this.fn_save_updated_item(objBody, objHeader, currentObject);   }
    
  }



  //Save New 
  fn_save_new_item(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();
  
    var objData = {};
        objData = {...currentObject};
        objData['id'] =0;
        objData['company_id']    = this.currentUser['company_id'];
        objData['group_user_id'] = this.newEditformData['id'];
        objData['user_id'] = currentObject['user']['id'];

        objData['created_by']   = this.currentUser['user_name'];
        objData['created_date'] = datefrmstr;

        objBody['object_parameters'] = objData;


    this.securitySrv.saveUserGroupItem(objBody,objHeader,'POST').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailData,'id',response['data'],'POST',{'user_id':1,'group_user_id':1});                
              }

              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.progressflag = false;
                    this.tableDetailChanges++; 
                    this.cd.detectChanges(); 
                  }, 300);

              this.progressflag = false;
              this.cd.detectChanges();
          });
 
  }




 //Save Updated Object 
 fn_save_updated_item(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();

    var objDataWhere = {};
        objDataWhere['id'] = currentObject['id'];
        objDataWhere['group_user_id'] = currentObject['group_user_id'];
        objDataWhere['company_id'] = currentObject['company_id'];    

    var sourceData =  JSON.parse(JSON.stringify(currentObject));      
    var objData = {};

    //Limpiar Todos los Nulos de Request
    /*
    for (const key in sourceData) {
        if( (sourceData[key] != null && sourceData[key] != undefined) 
         || ( key in {'user_id':1,'group_user_id':1 }  ) )
        { objData[key] = sourceData[key]; }        
    }
    */
        objData['id']   = sourceData['id'];
        objData['user_id'] = sourceData['user']['id'];        
        objData['status']   = sourceData['status'];
 

        objData['last_updated_by']   = this.currentUser['user_name'];
        objData['last_updated_date'] = datefrmstr;

        objBody['object_put_parameters'] = objData;
        objBody['object_parameters'] = objDataWhere;
 

    this.securitySrv.saveUserGroupItem(objBody,objHeader,'PUT').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailData,'id',objData,'PUT',{'user_id':1,'group_user_id':1});
              }


              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.progressflag = false;
                    this.tableDetailChanges++; 
                    this.cd.detectChanges(); 
                  }, 500);
           

              this.progressflag = false;
              this.cd.detectChanges();
          });
  }






//Save DELETE Object 
fn_save_delete_item(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();

    var objData = {};
        objData['id'] = currentObject['id'];
        objData['company_id'] = currentObject['company_id'];    

   
        objBody['object_parameters'] = objData;
 

    this.securitySrv.saveUserGroupItem(objBody,objHeader,'DELETE').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailData,'id',objData,'DELETE',{'user_id':1,'group_user_id':1});
              }


              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.tableDetailChanges++; 
                    this.progressflag = false;
                    this.cd.detectChanges(); 
                  }, 500);
           

              this.progressflag = false;
              this.cd.detectChanges();
          });
  }









  fn_update_table_row_detail( table_object, fieldId, objData,http_method , objRequiredFields){

    if( http_method == 'PUT' || http_method == 'POST' )
    { 
    var searchIndex = -1;
    var lsize = Object.keys(table_object).length;
    for(var i=0;i<lsize; i++){ 
          if(http_method == 'PUT' && objData[fieldId] == table_object[i][fieldId]){ searchIndex = i; break;} 
          if(http_method == 'POST' && 0 == table_object[i][fieldId]){ searchIndex = i; break;}     
    }
 
       if( searchIndex>-1 )
       {  
         for (const key in objData) {
            if( (objData[key] != null && objData[key] != undefined) 
              || ( key in objRequiredFields ) 
              )
            { table_object[searchIndex][key] = objData[key]; }        
         } console.log(table_object[searchIndex]);   
       }     
    }

    if( http_method == 'DELETE' )
    {  
        var lsize = Object.keys(table_object).length;
        for(var i=0;i<lsize; i++){ 
                                           
            if ( table_object[i][fieldId] === objData[fieldId]) { 
                table_object.splice(i, 1); 
                break; 
            }
        }
    }

  }























  /*  Grupo Usuario  Detalle Roles */
  fn_go_to_detail_role(){
    this.newEditformFlagShowMessageOk = false;  
    this.newEditformFlagShowMessageErr = false;  
    this.progressflag= true;
    this.tableDetailRoleData = [];
     
    var objBody = {'object_parameters':{'company_id': this.currentUser['company_id'] , 'group_user_id':this.newEditformData['id'] }};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
 
     this.securitySrv.getRoleGroupUser(objBody,objHeader).then(
     (response) => {
 
         if( response['requestcomplete'])
         { this.tableDetailRoleData = response['data'];   }
         else
         {  this.newEditformFlagShowMessageErr = true;  
            this.newEditformFlagValidateMessage = response['message'];  }
 
           this.progressflag= false;
           this.cd.detectChanges();   
       });
  
    this.fn_navigation('objdetailrole');
    this.cd.detectChanges();
}





  /*Datos Curren Role Table*/
  fn_getItemTableDetailRoleData(dataItemTable:any){
      this.tableDetailRoleDataCurrentItem = dataItemTable;
      //Evaluar Evento:
      if(this.tableDetailRoleDataCurrentItem['event']=='save')
      {  this.fn_saveitemrole( this.tableDetailRoleDataCurrentItem['data'] );  }

      if(this.tableDetailRoleDataCurrentItem['event']=='delete')
      {            
        const dialogRef = this.layoutUtilsService.deleteElement(
          this.translate.instant('GENERICFORM.txtgroupuserroleitem'),
          this.translate.instant('QUESTION_DELETE.ONE' ),
          this.translate.instant('MESSAGE.WAIT')
        );

         dialogRef.afterClosed().subscribe((res) => {
           //Respuesta Cancelar
           if (!res) { return; }
           //Respuesta Ok
           this.fn_deleteitemrole( this.tableDetailRoleDataCurrentItem['data'],this.tableDetailRoleDataCurrentItem['idx'] );       
         });         
      }
   }





   fn_NuevoItemDetailRole(){
        
    this.newEditformFlagValidate    = false;
    this.newEditformFlagShowMessageErr = false;

    var curdate = new Date();
    var datefrmstr = curdate.toISOString().substring(0, 10);

      var newitemdetobj = {};
          newitemdetobj['id'] = 0;
          newitemdetobj['role'] = {};                          
          newitemdetobj['status'] = true;

    //this.sectionrefresh = true;
    this.progressflag = true;
    
    setTimeout(()=>{  
        //  this.tableDetailData.push(newitemdetobj); 
          this.tableDetailRoleData.unshift(newitemdetobj); 
          this.tableDetailRoleChanges++; 
          this.progressflag= false;
          this.cd.detectChanges();
          //this.sectionrefresh = false;
        }, 300);
 
    

}




  //Item Datos DELETE
  fn_deleteitemrole( currentObject ,idx ){

    this.progressflag= true;
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
  
    var flagValidateForm = true;
    var validateMessage = '';
 
    this.newEditformFlagShowMessageErr = !flagValidateForm; 

    if(!flagValidateForm){ this.progressflag = false; }
  
    if( currentObject['id'] > 0 && flagValidateForm)
    {  this.fn_save_delete_item_role(objBody, objHeader, currentObject);   }

    if( currentObject['id'] == 0 )
    { 
       this.tableDetailRoleData.splice(idx, 1);  
       this.tableDetailRoleChanges++; 
       this.progressflag= false;
       this.cd.detectChanges();
    }

    
  }


      
  //Item Datos SAVE
  fn_saveitemrole( currentObject ){

    this.progressflag= true;
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};
  
    var flagValidateForm = true;
    var validateMessage = '';
 
    if( currentObject['role'] == null || currentObject['role'] == undefined || currentObject['role']['id'] == null || currentObject['role']['id'] == undefined )
    {  
      flagValidateForm = false;
      this.progressflag= false;
      validateMessage = 'txtdatarequired';
      this.newEditformFlagValidateMessage = this.currentLanguageTags[validateMessage];
    }

    this.newEditformFlagShowMessageErr = !flagValidateForm; 

    if(!flagValidateForm){ this.progressflag = false; }
   
    if( currentObject['id'] == 0 && flagValidateForm)
    {  this.fn_save_new_item_role(objBody, objHeader, currentObject);       }

    if( currentObject['id'] > 0 && flagValidateForm)
    {  this.fn_save_updated_item_role(objBody, objHeader, currentObject);   }
    
  }



  //Save New 
  fn_save_new_item_role(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();
  
    var objData = {};
        objData = {...currentObject};
        objData['id'] =0;
        objData['company_id']    = this.currentUser['company_id'];
        objData['group_user_id'] = this.newEditformData['id'];
        objData['software_role_id'] = currentObject['role']['id'];

        objData['created_by']   = this.currentUser['user_name'];
        objData['created_date'] = datefrmstr;

        objBody['object_parameters'] = objData;


    this.securitySrv.saveRoleGroupUser(objBody,objHeader,'POST').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailRoleData,'id',response['data'],'POST',{'software_role_id':1,'group_user_id':1});                
              }

              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.progressflag = false;
                    this.tableDetailRoleChanges++; 
                    this.cd.detectChanges(); 
                  }, 300);

              this.progressflag = false;
              this.cd.detectChanges();
          });
 
  }




 //Save Updated Object 
 fn_save_updated_item_role(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();

    var objDataWhere = {};
        objDataWhere['id'] = currentObject['id'];
        objDataWhere['group_user_id'] = currentObject['group_user_id'];
        objDataWhere['company_id'] = currentObject['company_id'];    

    var sourceData =  JSON.parse(JSON.stringify(currentObject));      
    var objData = {};

    //Limpiar Todos los Nulos de Request
    /*
    for (const key in sourceData) {
        if( (sourceData[key] != null && sourceData[key] != undefined) 
         || ( key in {'user_id':1,'group_user_id':1 }  ) )
        { objData[key] = sourceData[key]; }        
    }
    */
        objData['id']   = sourceData['id'];
        objData['software_role_id'] = currentObject['role']['id'];
        objData['status']   = sourceData['status'];
 

        objData['last_updated_by']   = this.currentUser['user_name'];
        objData['last_updated_date'] = datefrmstr;

        objBody['object_put_parameters'] = objData;
        objBody['object_parameters'] = objDataWhere;
 

    this.securitySrv.saveRoleGroupUser(objBody,objHeader,'PUT').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailRoleData,'id',objData,'PUT',{'software_role_id':1,'group_user_id':1});
              }


              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.progressflag = false;
                    this.tableDetailRoleChanges++; 
                    this.cd.detectChanges(); 
                  }, 500);
           

              this.progressflag = false;
              this.cd.detectChanges();
          });
  }






//Save DELETE Object 
fn_save_delete_item_role(objBody, objHeader, currentObject){
 
    var curdate = new Date();
    var datefrmstr = curdate.toISOString();

    var objData = {};
        objData['id'] = currentObject['id'];
        objData['company_id'] = currentObject['company_id'];    

   
        objBody['object_parameters'] = objData;
 

    this.securitySrv.saveRoleGroupUser(objBody,objHeader,'DELETE').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailRoleData,'id',objData,'DELETE',{'software_role_id':1,'group_user_id':1});
              }


              //this.sectionrefresh = true;
              this.progressflag = true;              
              setTimeout(()=>{                             
                    //this.sectionrefresh = false;
                    this.tableDetailRoleChanges++; 
                    this.progressflag = false;
                    this.cd.detectChanges(); 
                  }, 500);
           

              this.progressflag = false;
              this.cd.detectChanges();
          });
  }







}