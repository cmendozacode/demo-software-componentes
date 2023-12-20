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
import { forEach } from 'lodash';



@Component({
    selector: 'yp-role',
    templateUrl: './role.component.html',
    styleUrls: []
  })
  export class RoleComponent implements OnInit{

    subscriptions: Subscription[] = [];
    usuario$: Observable<User> = this.store.pipe(select(currentUser));
    currentUser:any;

    objHttpRequestHeader:any;

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


    newEditItemform:any=[];
    newEditItemformE:any=[];
    newEditItemformData:any={};
    newEditItemformFlagValidate:boolean = true;
 



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
              this.objHttpRequestHeader={'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};

        //Define Tabla de Detalle
        this.tableDetail = [            
            {"propertyName":"module_currentvalue" ,"fieldFormName":"pvmodule_name" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtmodule" , "propertyTextHolder" : "txtmodule", "visible":true , "required":true , "readonly":false,"searchflag":true, "maxlength": 15, "fieldWidth":"250px"},
            {"propertyName":"menu_currentvalue" ,"fieldFormName":"pvmenu_name" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtmenu" , "propertyTextHolder" : "txtmenu", "visible":true , "required":true , "readonly":false,"searchflag":false, "maxlength": 15, "fieldWidth":"250px"},

            {"propertyName":"status"  , "fieldFormName":"pvflagstatus" , "controlClass":"cssinputform", "controlType":"label"  ,"controlSubType": "boolean" ,"controlTrueValue": "txtactive","controlFalseValue": "txtinactive"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} ,            
            {"propertyName":"menuobj1" ,"fieldFormName":"menuobj1" , "controlClass":"cssinputform", "controlType":"menu",  "propertyTextLabel":"txttablemenuhead" , "propertyTextHolder" : "txttablemenuhead" ,"controlMenuView":false  ,"controlMenuEdit":true ,"controlMenuDelete":true ,"controlMenuSave":false, "visible":true , "readonly":false, "maxlength": 15, "fieldWidth":"50px"},
        ];




  //Define New Edit Form Item

  var datatable02strct = [{ "propertyName":"code", "propertyValue":"code","fieldFormName":"pvcode", "propertyTextLabel":"txtcode", "visible":true ,  "fieldWidth":"150px" }
  ,{ "propertyName":"name", "propertyValue":"name","fieldFormName":"pvname", "propertyTextLabel":"txtname", "visible":true ,  "fieldWidth":"250px" }];

  
  var objRequestParamModule = this.securitySrv.getHttpParamsGetModules(this.currentUser);

  var datastructureAPIModule = {"urlGateWay":objRequestParamModule['url'] ,
  "httpHeader":objRequestParamModule['header'], 
  "params":objRequestParamModule['params'],
  "paramsbody":objRequestParamModule['paramsbody'],
  "body":objRequestParamModule['body'],
  "httpMethod":'POST'};


  var objRequestParamMenu = this.securitySrv.getHttpParamsGetMenus(this.currentUser);

  var datastructureAPIMenu ={"urlGateWay":objRequestParamMenu['url'] ,
  "httpHeader":objRequestParamMenu['header'], 
  "params":objRequestParamMenu['params'],
  "paramsbody":objRequestParamMenu['paramsbody'],
  "body":objRequestParamMenu['body'],
  "httpMethod":'POST'};


  this.newEditItemform =[
    {"groupFields":"row1" , "controlClass":"cssgroupform",
    "groupConfig":[           
           {"propertyName":"module" , "fieldFormName":"plobjmodule" , "controlClass":"cssinputsearchform", "controlType":"searchinput" , "propertyTextLabel" : "txtmodule","searchflag":true,   "visible":true , "required":true, "readonly":true,  "fieldWidth":"300px","propertyTextTitle":"txtsearchcontrol", "collectionData":[], "selectedDataFieldView":"name", "structureData":datatable02strct, "enableDataApi":true,"tablePageRowSize":5 ,"tableLineHeightPage":38,"structureDataApi":datastructureAPIModule ,"searchModelWidth":"550px","searchModelHeight":"485px"} ,
           {"propertyName":"menu" , "fieldFormName":"plobjmenu" , "controlClass":"cssinputsearchform", "controlType":"searchinput" , "propertyTextLabel" : "txtmenu","searchflag":true,   "visible":true , "required":false, "readonly":true,  "fieldWidth":"300px","propertyTextTitle":"txtsearchcontrol", "collectionData":[], "selectedDataFieldView":"name", "structureData":datatable02strct, "enableDataApi":true,"tablePageRowSize":5 ,"tableLineHeightPage":38,"structureDataApi":datastructureAPIMenu ,"searchModelWidth":"550px","searchModelHeight":"485px"} ,
                 ]
    }
    ,
    {"groupFields":"row3" , "controlClass":"cssgroupform",
     "groupConfig":[
           {"propertyName":"description"  ,"fieldFormName":"pvdescription" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtdescription",  "propertyTextLabel":"txtdescription", "visible":true , "required":false , "readonly":false, "fieldWidth":"400px"}
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
           {"propertyName":"company_id"  ,"fieldFormName":"pvrepeat_passowrd" , "controlClass":"cssinputform", "controlType":"hidden"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtrepeatpassword",  "propertyTextLabel":"txtrepeatpassword", "visible":false , "required":false , "readonly":false, "fieldWidth":"250px"},
           {"propertyName":"software_role_id"  ,"fieldFormName":"pvrepeat_passowrd" , "controlClass":"cssinputform", "controlType":"hidden"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtrepeatpassword",  "propertyTextLabel":"txtrepeatpassword", "visible":false , "required":false , "readonly":false, "fieldWidth":"250px"}
                 ]
    }
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
    this.newEditformFlagShowMessageOk = false;  
    this.newEditformFlagShowMessageErr = false; 
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
   var objHeader = this.objHttpRequestHeader;

    this.securitySrv.getRoles(objBody,objHeader).then(
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
    this.newEditformFlagShowMessageOk = false;      

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

    return objData;
  }



  //Item Datos SAVE
  fn_save(){

    this.progressflag= true;

    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader = this.objHttpRequestHeader;
  
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

        objData['created_by']   = this.currentUser['user_name'];
        objData['created_date'] = datefrmstr;

        objBody['object_parameters'] = objData;


    this.securitySrv.saveRoles(objBody,objHeader,'POST').then(
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
         || ( key in {'code':1,'name':1,'description':1}  ) )
        { objData[key] = sourceData[key]; }        
    }
    
        delete objData['company_id'];

        objData['last_updated_by']   = this.currentUser['user_name'];
        objData['last_updated_date'] = datefrmstr;

        objBody['object_put_parameters'] = objData;
        objBody['object_parameters'] = objDataWhere;
 

    this.securitySrv.saveRoles(objBody,objHeader,'PUT').then(
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
              || ( key in {'code':1,'name':1,'description':1}  ) 
              )
            { table_object[searchIndex][key] = objData[key]; }        
         }         
       }     
    }

    if(http_method == 'POST'){ table_object.push(objData); }

  }








  /*  Eventos Detalle */
  fn_get_format_detail_table(obj_table){
    
       obj_table.forEach(element => {
         if(element['module']){ element['module_currentvalue'] = element['module']['name']; }
         if(element['menu']){  element['menu_currentvalue'] = element['menu']['name']; }
       });

       return obj_table;

  }


    fn_go_to_detail(){
        this.newEditformFlagShowMessageErr = false;
        this.newEditformFlagShowMessageOk = false;
   
        this.progressflag= true;
        this.tableDetailData = [];
         
        var objBody = {'object_parameters':{ 'software_role_id':this.newEditformData['id'] }};
        var objHeader = this.objHttpRequestHeader;
     
         this.securitySrv.getRolesGrant(objBody,objHeader).then(
         (response) => {
             
             if( response['requestcomplete'])
             {  this.tableDetailData = response['data']; }//this.fn_get_format_detail_table(response['data']); }
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
        this.newEditformFlagShowMessageOk = false;   
    
          var newitemdetobj = {};
              newitemdetobj['id'] = 0;
              newitemdetobj['module'] = {}; 
              newitemdetobj['menu'] = {}; 
              newitemdetobj['status'] = true;

        this.newEditItemformData = newitemdetobj;
      
        this.progressflag = true;
        this.currentView = 'objdetailnew';
     
        setTimeout(()=>{  
            //  this.tableDetailData.push(newitemdetobj); 
            //  this.tableDetailData.unshift(newitemdetobj); 
            //  this.tableDetailChanges++; 
              this.progressflag= false;
              this.cd.detectChanges();
              //this.sectionrefresh = false;
            }, 300);
             
    }


    /*Datos Curren Table*/
    fn_getItemTableDetailData(dataItemTable:any){
        this.tableDetailDataCurrentItem = dataItemTable;
        
        //Evaluar Evento:
       // if(this.tableDetailDataCurrentItem['event']=='save')
       // {  this.fn_saveitem( this.tableDetailDataCurrentItem['data'] );  }

        if(this.tableDetailDataCurrentItem['event']=='update')
        {  this.fn_edititem( this.tableDetailDataCurrentItem['data'] ,this.tableDetailDataCurrentItem['idx']);  }


        if(this.tableDetailDataCurrentItem['event']=='delete')
        {            
          const dialogRef = this.layoutUtilsService.deleteElement(
            this.translate.instant('GENERICFORM.txtgrantroleitem'),
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
    var objHeader = this.objHttpRequestHeader;
  
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



    
  //Item Datos EDIT
  fn_edititem( currentObject , idx){
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;

    this.newEditItemformData = currentObject;

    this.fn_navigation('objdetailnew');
    this.cd.detectChanges();

  }

      



  //Item Datos SAVE
  fn_saveitem(  ){

    var currentObject = this.newEditItemformData;

    this.progressflag= true;
    this.newEditformFlagShowMessageErr = false;
    this.newEditformFlagShowMessageOk = false;
 
    var objBody = {'object_parameters':{}};
    var objHeader =  this.objHttpRequestHeader;
  
    var flagValidateForm = true;
    var validateMessage = '';
 
    if( currentObject['module'] == null || currentObject['module'] == undefined || currentObject['module']['id'] == null || currentObject['module']['id'] == undefined )
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
        objData['software_role_id'] = this.newEditformData['id'];

        objData['software_module_id'] = currentObject['module']['id'];
        if( currentObject['menu_currentvalue'] !=null)
        {objData['software_menu_id'] = currentObject['menu']['id'];}

        objData['created_by']   = this.currentUser['user_name'];
        objData['created_date'] = datefrmstr;

        objBody['object_parameters'] = objData;


    this.securitySrv.saveRolesGrant(objBody,objHeader,'POST').then(
        (response) => { 

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 
                  
                  //Actualizar ID
                   objData['id'] = response['data']['id'];
                                      
                this.fn_update_table_row_detail(this.tableDetailData,'id',objData,'POST');                
                this.newEditItemformData['id'] = objData['id'];
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
        objDataWhere['software_role_id'] = currentObject['software_role_id'];
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
        objData['id'] = sourceData['id'];
        objData['software_role_id'] =  sourceData['software_role_id'];
        if( currentObject['module_currentvalue'] != null && currentObject['module_currentvalue'] != undefined)
        { objData['software_module_id'] = currentObject['module']['id'];
          currentObject['software_module_id'] = objData['software_module_id'];
        }
        if( currentObject['menu_currentvalue'] != null && currentObject['menu_currentvalue'] != undefined)
        { objData['software_menu_id'] = currentObject['menu']['id']; 
          currentObject['software_menu_id'] = objData['software_menu_id'];        
        }
        if( currentObject['menu_currentvalue'] == null || currentObject['menu_currentvalue'] == undefined)
        { objData['software_menu_id'] = null;
          currentObject['software_menu_id'] = null;
        }

        objData['description']   = sourceData['description'];
        objData['status']   = sourceData['status'];
 

        objData['last_updated_by']   = this.currentUser['user_name'];
        objData['last_updated_date'] = datefrmstr;

        objBody['object_put_parameters'] = objData;
        objBody['object_parameters'] = objDataWhere;
 

    this.securitySrv.saveRolesGrant(objBody,objHeader,'PUT').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailData,'id',currentObject,'PUT');
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
 

    this.securitySrv.saveRolesGrant(objBody,objHeader,'DELETE').then(
        (response) => {

              if( response['requestcomplete'] == false){
                this.newEditformFlagShowMessageErr = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']];
              }

              if( response['requestcomplete'] == true){
                this.newEditformFlagShowMessageOk = true;
                this.newEditformFlagValidateMessage = this.currentLanguageTags[response['message']]; 

                this.fn_update_table_row_detail(this.tableDetailData,'id',objData,'DELETE');
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









  fn_update_table_row_detail( table_object, fieldId, objData,http_method ){

    if( http_method == 'PUT'   )
    { 
    var searchIndex = -1;
    var lsize = Object.keys(table_object).length;
    for(var i=0;i<lsize; i++){ 
          if(http_method == 'PUT' && objData[fieldId] == table_object[i][fieldId]){ searchIndex = i; break; }                
    }
     
       if( searchIndex>-1 )
       { 
         for (const key in objData) {
            if( (objData[key] != null && objData[key] != undefined) 
              || ( key in {'software_product_id':1,'software_role_id':1,'software_module_id':1,'software_menu_id':1,'menu_currentvalue':1,'module_currentvalue':1}  ) 
              )
            { table_object[searchIndex][key] = objData[key]; }        
         } 
       }     
    }

    if(http_method == 'POST'){ table_object.unshift(objData); }


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




  //Eventos Formulario Nuevo e Edicion
      //Recover Data from Form
      getNewEditItemFormData(dataForm:any){ this.newEditItemformData= dataForm;  }
      getNewEditItemFormValidation(dataForm:any){ this.newEditItemformFlagValidate = dataForm; }
   
   






}