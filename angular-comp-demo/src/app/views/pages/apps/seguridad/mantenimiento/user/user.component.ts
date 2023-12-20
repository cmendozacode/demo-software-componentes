import { Component,SimpleChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { MatDialog,MatDialogRef } from '@angular/material/dialog';


import { TranslationService } from '../../../../../../core/_base/layout';

//import {languageTagService} from './lib-components/languagetag-component/languagetag.component';
import {languageTagService} from '../../../../lib/lib-services/language-tag-service/language-tag.service';

import {DialogFormSearchInputComponent} from '../../../../lib/lib-components/htmlform-component/htmlform.component';

import { currentCultivo, currentEmpresa, currentUser, User } from '../../../../../../core/auth';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AppState } from '../../../../../../core/reducers';

import { SecurityService } from '../../services/security.service'



@Component({
    selector: 'yp-user',
    templateUrl: './user.component.html',
    styleUrls: []
  })
  export class UserComponent implements OnInit{

    subscriptions: Subscription[] = [];
    usuario$: Observable<User> = this.store.pipe(select(currentUser));
    currentUser:any;

    progressflag:boolean = false;

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


    newEditform:any=[];
    newEditformE:any=[];
    newEditformData:any={};
    newEditformFlagValidate:boolean = true;
 

    newEditformFlagShowMessageErr:boolean = false;
    newEditformFlagShowMessageOk:boolean = false;
    newEditformFlagValidateMessage:string='';

    objectCurrentItem:any;

    constructor(private cd: ChangeDetectorRef,private languageTagSrv: languageTagService,public dialog: MatDialog,private translationService: TranslationService,
                private securitySrv: SecurityService,private store: Store<AppState>) {}

    ngOnInit(){
    
        var languageCurrent = this.translationService.getSelectedLanguage();

        var languageTags = this.languageTagSrv.fn_get_language_tags_ts(languageCurrent);

        this.currentLanguageTags = languageTags['data']['GENERICFORM'];

        //Define Search Box
        this.searchBox =[
            {"groupFields":"row1" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"user_name"  ,"fieldFormName":"pvusername" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtname",  "propertyTextLabel":"txtname", "visible":true , "required":false , "readonly":false, "fieldWidth":"300px"}
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
            {"propertyName":"user_name" ,"fieldFormName":"pvname" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtusername" , "propertyTextHolder" : "txtusername", "visible":true , "required":true , "readonly":false,"searchflag":true, "maxlength": 15, "fieldWidth":"150px"},
            {"propertyName":"full_name"  ,"fieldFormName":"pvfullname" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtfullname" , "propertyTextHolder" : "txtfullname", "visible":true , "required":true , "readonly":false,"searchflag":true, "maxlength": 15, "fieldWidth":"350px"},
            {"propertyName":"description"  ,"fieldFormName":"pvdescription" , "controlClass":"cssinputform", "controlType":"label" ,"controlSubType": "text"  ,  "propertyTextLabel":"txtdescription" , "propertyTextHolder" : "txtdescription", "visible":false , "required":true , "readonly":false,"searchflag":false, "maxlength": 15, "fieldWidth":"150px"},            
            {"propertyName":"end_date"  , "fieldFormName":"pvenddate" , "controlClass":"cssinputform", "controlType":"label"   ,"controlSubType": "date"   , "propertyTextLabel" : "txtdate",   "visible":false , "buttontext":""  ,  "fieldWidth":"100px"}  ,  
            {"propertyName":"status"  , "fieldFormName":"pvflagstatus" , "controlClass":"cssinputform", "controlType":"label"  ,"controlSubType": "boolean" ,"controlTrueValue": "txtactive","controlFalseValue": "txtinactive"   , "propertyTextLabel" : "txtstatus",   "visible":true , "buttontext":""  ,  "fieldWidth":"100px"} ,
            {"propertyName":"menuobj1" ,"fieldFormName":"menuobj1" , "controlClass":"cssinputform", "controlType":"menu",  "propertyTextLabel":"txttablemenuhead" , "propertyTextHolder" : "txttablemenuhead" ,"controlMenuView":false  ,"controlMenuEdit":true ,"controlMenuDelete":false ,"controlMenuSave":false, "visible":true , "readonly":false, "maxlength": 15, "fieldWidth":"50px"},
        ];

        //Define New Form
        this.newEditform =[
            {"groupFields":"row1" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"user_name"  ,"fieldFormName":"pvusername" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtname",  "propertyTextLabel":"txtname", "visible":true , "required":true , "readonly":false, "fieldWidth":"200px"}
                         ]
            },
            {"groupFields":"row2" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"full_name"  ,"fieldFormName":"pvfullname" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtfullname",  "propertyTextLabel":"txtfullname", "visible":true , "required":true , "readonly":false, "fieldWidth":"400px"}
                         ]
            }
            ,
            {"groupFields":"row3" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"description"  ,"fieldFormName":"pvdescription" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtdescription",  "propertyTextLabel":"txtdescription", "visible":true , "required":false , "readonly":false, "fieldWidth":"400px"}
                         ]
            }
            ,
            {"groupFields":"row4" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"email_address"  ,"fieldFormName":"pvemail_address" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtemail",  "propertyTextLabel":"txtemail", "visible":true , "required":false , "readonly":false, "fieldWidth":"200px"},
                   {"propertyName":"cellphone_nro"  ,"fieldFormName":"pvcellphone_nro" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtcellphone",  "propertyTextLabel":"txtcellphone", "visible":true , "required":false , "readonly":false, "fieldWidth":"150px"}
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
           {"groupFields":"row11" , "controlClass":"cssgroupform",
           "groupConfig":[
              {"propertyName":"objlabel" ,"fieldFormName":"pvlabel" , "controlClass":"csstextform", "controlType":"text" ,"controlSubType": "h5" ,  "propertyTextLabel":"txt_h_asignpassword", "visible":true , "required":true , "readonly":false,  "fieldWidth":"250px"},
            ]
           }
           ,
            {"groupFields":"row4" , "controlClass":"cssgroupform",
            "groupConfig":[
                   {"propertyName":"base_password"  ,"fieldFormName":"pvbase_password" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtpassword",  "propertyTextLabel":"txtpassword", "visible":true , "required":false , "readonly":false, "fieldWidth":"250px"},
                   {"propertyName":"repeat_passowrd"  ,"fieldFormName":"pvrepeat_passowrd" , "controlClass":"cssinputform", "controlType":"input"     ,"controlSubType": "text"   , "propertyTextHolder" : "txtrepeatpassword",  "propertyTextLabel":"txtrepeatpassword", "visible":true , "required":false , "readonly":false, "fieldWidth":"250px"}
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


      this.subscriptions.push(
            combineLatest([this.usuario$ ]).subscribe(([resUsuario]) => {
              this.currentUser = resUsuario;
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
  
     if(this.searchBoxFlagValidate == false)
     {  console.log("Formulario No Completo"); }
     else
     {  console.log("Formulario OK");  }
  
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
    this.currentView = pv_viewname; this.cd.detectChanges();
  } 



//Consulta de Usuarios
fn_Consultar(){
   this.progressflag= true;
   var searchtxt = '' ;
   
   if( this.searchBoxData['user_name'] != null && this.searchBoxData['user_name'] != undefined)
   { searchtxt = this.searchBoxData['user_name']; }
    
   var objBody = {'object_parameters':{'company_id': this.currentUser['company_id'] , 'user_name':'%'+searchtxt+'%'}};
   var objHeader = {'user_name': this.currentUser['user_name'],'company_id':''+ this.currentUser['company_id'],'user_token_session': this.currentUser['token_session']};

    this.securitySrv.getSearchUsers(objBody,objHeader).then(
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
          newitemobj['user_name'] = null;
          newitemobj['full_name'] = null;
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

    objData['password']        = null;
    objData['base_password']   = null;
    objData['repeat_passowrd'] = null;

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

    if( ( this.newEditformData['base_password'] != null   && this.newEditformData['base_password'] != undefined   && this.newEditformData['base_password'] != "" ) ||
        ( this.newEditformData['repeat_passowrd'] != null && this.newEditformData['repeat_passowrd'] != undefined && this.newEditformData['repeat_passowrd'] != "" ) )
    {
        if( this.newEditformData['base_password'] == this.newEditformData['repeat_passowrd'] )
            { this.newEditformData['password'] = this.newEditformData['base_password']; }
        else{ flagValidateForm = false;
              validateMessage = 'txtpasswordnoequal'; 
              this.newEditformFlagValidateMessage = this.currentLanguageTags[validateMessage];
            }
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


    this.securitySrv.saveNewUser(objBody,objHeader).then(
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
         || ( key in {'start_date':1,'end_date':1,'cellphone_nro':1,'email_address':1,'full_name':1,'description':1}  ) )
        { objData[key] = sourceData[key]; }        
    }
    
        //
        //  delete objData['id'];
        //  delete objData['password'];
        //  delete objData['cellphone_nro'];      
        //  delete objData['email_address'];
        //  delete objData['psswrd_date'];   
        //
        
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
 

    this.securitySrv.saveUdatedUser(objBody,objHeader).then(
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
              || ( key in {'start_date':1,'end_date':1,'cellphone_nro':1,'email_address':1,'full_name':1,'description':1}  ) 
              )
            { table_object[searchIndex][key] = objData[key]; }        
         }         
       }     
    }

    if(http_method == 'POST'){ table_object.push(objData); }

  }





}