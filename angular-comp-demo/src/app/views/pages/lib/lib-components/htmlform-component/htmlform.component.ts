import { Component, OnInit, Input,  SimpleChanges, ViewChild , Output, EventEmitter ,Inject } from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
//import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'ps-html-form',
    templateUrl: './htmlform.component.html',
    styleUrls: ['./htmlform.component.scss'],
  })
export class HtmlFormComponent implements OnInit {


    @Input() jsonHtmlFormStructure: any;
    @Input() jsonLanguageTags: any;
    @Input() formClass: string='cssformbase';

    @Input() flagFormReadOnly: boolean=false;
    @Input() flagFormValidate: boolean=false;
    @Input() flagFormValidateFlag: boolean=false;
    
    @Input() inputDataObject: any;

    @Output() outputDataForm = new EventEmitter<any>();
    @Output() outputValidateDataForm = new EventEmitter<any>();

    
    curflagFormValidate: boolean=false;    
    curValidateDataForm: boolean=true;    
    itemControl:any;
    currentObject :any;
    flagValueTrue:boolean = true;

    

    

    constructor(public dialog: MatDialog ) {}
    

    ngOnInit(){
        this.currentObject = {};

        //this.jsonHtmlFormStructure = JSON.parse(this.htmlFormStructure);
        //console.log(this.jsonHtmlFormStructure);

        this.fn_InitFormElements();                
      }

      ngOnChanges(changes: SimpleChanges) {
    
        //this.jsonHtmlFormStructure = JSON.parse(this.htmlFormStructure);
        //Evaluate Validations of fields
        if(this.flagFormValidate == true)
        { this.fn_FormValidation();     }

      }


      onSubmit(){

      }

      fn_ngClassEval()
      {
        var responseClass = "";

        if(this.flagFormReadOnly == false){ responseClass = this.formClass; }
        if(this.flagFormReadOnly == true){ responseClass = this.formClass +" "+"cssReadOnly"; }

        return responseClass;
      }

   


     //Ejecutar Inits de GroupRadio Button
     fn_InitFormElements(){

      var curGroup = [];
     //Limpiar Todos los Hijos o Combos Dependientes
     this.jsonHtmlFormStructure.forEach((groupElement:any) => {

      curGroup = groupElement['groupConfig'];
      
      if(curGroup){
      curGroup.forEach((configEment:any) => {

        //Set Init For : hidden
        if( configEment['controlType'] == "hidden" ){
          this.currentObject[configEment['propertyName']] = this.inputDataObject[configEment['propertyName']];
        }

        //Set Init For : input
        if( configEment['controlType'] == "input" ){
           this.currentObject[configEment['propertyName']] = this.inputDataObject[configEment['propertyName']];
        }
       
        //Set Init For : textarea
        if( configEment['controlType'] == "textarea" ){
          this.currentObject[configEment['propertyName']] = this.inputDataObject[configEment['propertyName']];
        }

         //Set Init For : groupradiobutton 
         if( configEment['controlType'] == "groupradiobutton" ){

            var objdata = this.inputDataObject[configEment['propertyName']];

            if(objdata!= null && objdata != undefined && objdata != {})
            { this.currentObject[configEment['propertyName']] = objdata;
              this.currentObject[configEment['propertyName']+'_tmprbg'] = {};
              this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] = objdata[configEment['propertyDataGroupButtonItemId']]; }
            else
            { this.currentObject[configEment['propertyName']] = {};
              this.currentObject[configEment['propertyName']+'_tmprbg'] = {};
              this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] = -1; }
              
            //Set Value Checked by Load
            var  listDataCollectionRB = configEment['collectionData'];
            var idx = 0;
            listDataCollectionRB.forEach((rbelement:any) => {
             
              if(rbelement[configEment['propertyDataGroupButtonItemId']] == this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] )
                  { this.currentObject[configEment['propertyName']+'_tmprbg']['checked'+idx] = true;  }
              else{ this.currentObject[configEment['propertyName']+'_tmprbg']['checked'+idx] = false; }
              
              idx++;
            });
        }

        //Set Init For : datalist
        if( configEment['controlType'] == "datalist" ){
          
          var objdata = this.inputDataObject[configEment['propertyName']];

          if(objdata!= null && objdata != undefined && objdata != {}){
            this.currentObject[configEment['propertyName']] = objdata;
            this.currentObject[configEment['propertyName']+'_currentvalue'] = objdata[configEment['propertyDataListItemName']];   
            //this.currentObject[configEment['propertyDataListCurrentValue']] = objdata[configEment['propertyDataListItemName']];
            
          }
          
        }

        //Set Init For : searchinput
        if( configEment['controlType'] == "searchinput" ){
          
          var objdata = this.inputDataObject[configEment['propertyName']];

          if(objdata!= null && objdata != undefined && objdata != {}){
            this.currentObject[configEment['propertyName']] = objdata;
            this.currentObject[configEment['propertyName']+'_currentvalue'] = objdata[configEment['selectedDataFieldView']];                          
          }
          
        }


     //Set Init For : input DateRange
     if( configEment['controlType'] == "daterange" ){
      this.currentObject[configEment['propertyName']] = {};   
      
       if( this.inputDataObject[configEment['propertyName']] != null ||  this.inputDataObject[configEment['propertyName']] != undefined)
       {
         this.currentObject[configEment['propertyName']] = this.inputDataObject[configEment['propertyName']];
       }
     }


      //Set Init For : input File
      if( configEment['controlType'] == "input" && configEment['controlSubType'] == "file"  ){
     //   this.currentObject[configEment['propertyName']+'_filevalue'] = 

      }


     //Set Init For : Select Multi
     if( configEment['controlType'] == "selectmultiple" ){
        
         var objdata = this.inputDataObject[configEment['propertyName']];
  
         if(objdata!= null && objdata != undefined && objdata != {}){
            this.currentObject[configEment['propertyName']] = objdata;
            var listSelectMulti:any = [];
            objdata.forEach((objrcur:any) => {
               listSelectMulti.push(objrcur[configEment['propertyDataListItemName']]);              
            });
            this.currentObject[configEment['propertyName']+'_currentvalue'] = listSelectMulti;   
               
         }
            
      }


       });
      }

    });

    } 


    /*START -  On Change Events*/

    fn_OnChangeInputText(objectDef:any, objectData:any){

        //Call Global
        this.fn_OnChangeGlobal(objectData);
    }

    fn_OnChangeInputNumber(objectDef:any, objectData:any){

        //Call Global
        this.fn_OnChangeGlobal(objectData);
    }

    fn_OnChangeInputCheckbox(objectDef:any, objectData:any){

        //Call Global
        this.fn_OnChangeGlobal(objectData);
    }

    fn_OnChangeInputRadioButton(objectDef:any, objectData:any){

      //Call Global
      this.fn_OnChangeGlobal(objectData);
    } 

    fn_OnChangeInputDate(objectDef:any, objectData:any){

        //Call Global
        this.fn_OnChangeGlobal(objectData);
    }

    fn_OnChangeInputFile(objectDef:any, objectData:any, event:any){
 
      var lsize = Object.keys(event.target.files).length;

      if( lsize > 0)
      {
       var vobjtarget = event.target.files[0];

        if( vobjtarget != null && vobjtarget != undefined ){
          objectData[objectDef['propertyName']+'_filerefvalue'] = vobjtarget ;
        }
      }

      //Call Global
     // this.fn_OnChangeGlobal(objectData);
  }


    fn_OnChangeGroupRadioButton(objectDef:any, objectData:any,itemRadioBttn:any){

      this.fn_Click_GroupRadioButton(objectDef, objectData, itemRadioBttn);

      //Call Global
      this.fn_OnChangeGlobal(objectData);
    }



    fn_LoadInputFile(objectDef:any, objectData:any){
 
     const dataFileRef = objectData[objectDef['propertyName']+'_filerefvalue'];
  
     const fr = new FileReader();
     fr.onload = () => {
       var fileContent = fr.result;
       objectData[objectDef['propertyName']] = fileContent ;
       //Call Global
       this.fn_OnChangeGlobal(objectData);
     }
     
     if(objectDef['controlFileReaderMethod']=='readAsText'){ fr.readAsText(dataFileRef); }
     if(objectDef['controlFileReaderMethod']=='readAsArrayBuffer'){ fr.readAsArrayBuffer(dataFileRef); }
     if(objectDef['controlFileReaderMethod']=='readAsBinaryString'){ fr.readAsBinaryString(dataFileRef); }

    }




     //On Change Generico para Data Lists
    fn_OnChangeInputDataList(objectDef:any, objectData:any){

      var listData = [];
      var dataTextValue = "";
      dataTextValue = objectData[objectDef['propertyName']+'_currentvalue'];
      
      listData = objectDef['collectionData'];
      var flagFound = false; 
      var curObjet = {}; 
      var lsize = 0; lsize = Object.keys(listData).length;
      for(var i=0;i<lsize;i++)
      { if( listData[i][objectDef['propertyDataListItemName']]  == dataTextValue){ flagFound = true;  curObjet = listData[i]; break; }  }

      this.currentObject[objectDef['propertyName']] =  curObjet;
     
      //Limpiar Todos los Hijos o Combos Dependientes
      this.fn_recursive_clean_datalist_fields(objectDef['propertyName']);
      //Call Global
      this.fn_OnChangeGlobal(objectData);
    }


    fn_recursive_clean_datalist_fields(objPropertyName:any){
      
     var curGroup = [];
     //Limpiar Todos los Hijos o Combos Dependientes
     this.jsonHtmlFormStructure.forEach((groupElement:any) => {

      curGroup = groupElement['groupConfig'];
      
      if(curGroup){
      curGroup.forEach((configEment:any) => {
       if( configEment['propertyDataListFilterPropertyName'] == objPropertyName ){
          this.currentObject[configEment['propertyName']] = {};
          this.currentObject[configEment['propertyName']+'_currentvalue'] = "";

          this.fn_recursive_clean_datalist_fields(configEment['propertyName']);         
         }
       });
      }

    });

    }





    //On Change Generico para Data Select Multiple
    fn_OnChangeInputDataSelect(objectDef:any, objectData:any){
 
      var listData = [];
      var dataTextValue = [];
      dataTextValue = objectData[objectDef['propertyName']+'_currentvalue'];
      var ljsize = 0; ljsize = Object.keys(dataTextValue).length;
      if( ljsize < 1 ){ dataTextValue = []; }
      
      listData = objectDef['collectionData'];
      var flagFound = false; 
      var curObjet = []; 
      var lsize = 0; lsize = Object.keys(listData).length;
     
      for(var i=0;i<lsize;i++)
      { 
        for(var j=0;j<ljsize;j++)
        {
          if( listData[i][objectDef['propertyDataListItemName']]  == dataTextValue[j]){ flagFound = true;  curObjet.push(listData[i]); break; }  
        }
      }

      this.currentObject[objectDef['propertyName']] =  curObjet;
     
      //Limpiar Todos los Hijos o Combos Dependientes
      this.fn_recursive_clean_dataselect_fields(objectDef['propertyName']);

      //Call Global
      this.fn_OnChangeGlobal(objectData);
    }


    fn_recursive_clean_dataselect_fields(objPropertyName:any){
      
     var curGroup = [];
     //Limpiar Todos los Hijos o Combos Dependientes
     this.jsonHtmlFormStructure.forEach((groupElement:any) => {

      curGroup = groupElement['groupConfig'];
      
      if(curGroup){
      curGroup.forEach((configEment:any) => {
       if( configEment['propertyDataListFilterPropertyName'] == objPropertyName ){
          this.currentObject[configEment['propertyName']] = [];
          this.currentObject[configEment['propertyName']+'_currentvalue'] = [];

          this.fn_recursive_clean_dataselect_fields(configEment['propertyName']);         
         }
       });
      }

    });

    }














    /*END -  On Change Events*/
    fn_OnChangeGlobal(objectData:any){
      this.outputDataForm.emit(objectData);

        //Evaluate Validations of fields
        if(this.flagFormValidate == true)
        { this.fn_FormValidation();     }
    }



    /* Data List - Filtros  */
    fn_DataListFilter(objectDef:any, objectDataList:any):any[]{

      var listDataListFilter:any[]=[];
      var idFilter:any = null;

      if( objectDef['propertyDataListFilterPropertyName'] != null && objectDef['propertyDataListFilterId'] != null && objectDef['propertyDataListItemParentId'] != null )
      {

        //Data Con filtro
        if(this.currentObject[objectDef['propertyDataListFilterPropertyName']] != null && this.currentObject[objectDef['propertyDataListFilterPropertyName']][objectDef['propertyDataListFilterId']] != null)
        {
           idFilter = this.currentObject[objectDef['propertyDataListFilterPropertyName']][objectDef['propertyDataListFilterId']];

           objectDataList.forEach((curObj: any) => {
            if(curObj[objectDef['propertyDataListItemParentId']] == idFilter )
            {
              listDataListFilter.push(curObj);
            }
          });     
        }
        else
        { return [];}
        
      }
      else
      {
        //No hay Configuracion de Pre filtro y muestra todo
        objectDataList.forEach((curObj: any) => {
          listDataListFilter.push(curObj);
       });

      }
    

      return listDataListFilter;
        
    }




    /* Data Select Multiple - Filtros  */
    fn_DataSelectFilter(objectDef:any, objectDataList:any):any[]{

      var listDataListFilter:any[]=[];
      var idFilter:any = null;

      if( objectDef['propertyDataListFilterPropertyName'] != null && objectDef['propertyDataListFilterId'] != null && objectDef['propertyDataListItemParentId'] != null )
      {
       
        if( this.currentObject[objectDef['propertyDataListFilterPropertyName']] != null && this.currentObject[objectDef['propertyDataListFilterPropertyName']] !=  undefined )
        {
        var listDataA = this.currentObject[objectDef['propertyDataListFilterPropertyName']];
        var lsizeA = Object.keys(listDataA).length;

        for(var i=0; i<lsizeA; i++)
        {
         var curObjectParent = listDataA[i];

        //Data Con filtro
        if(curObjectParent != null && curObjectParent[objectDef['propertyDataListFilterId']] != null)
        {
           idFilter = curObjectParent[objectDef['propertyDataListFilterId']];

           objectDataList.forEach((curObj: any) => {
             if(curObj[objectDef['propertyDataListItemParentId']] == idFilter )
             {  listDataListFilter.push(curObj);  }
          });     
        }
        else
        { return [];}
        }
      }
      else
      { return [];}
        
      }
      else
      {
        //No hay Configuracion de Pre filtro y muestra todo
        objectDataList.forEach((curObj: any) => {
          listDataListFilter.push(curObj);
       });

      }
    
      return listDataListFilter;
        
    }














    /* CLICK: Grupo Radio Button */
    fn_Click_GroupRadioButton(objectDef:any, objectData:any, objectCurItem:any){

      var curGroupRadioButtonValue = -1;

      curGroupRadioButtonValue = objectCurItem[objectDef['propertyDataGroupButtonItemId']];

      objectData[objectDef['propertyName']] = objectCurItem;
      objectData[objectDef['propertyName']+'_tmprbg']['currentvalue']  = curGroupRadioButtonValue; 

        //Set Value Checked by Load
        var  listDataCollectionRB = objectDef['collectionData'];
        var idx = 0;
        listDataCollectionRB.forEach((rbelement:any) => {
             
           if( rbelement[objectDef['propertyDataGroupButtonItemId']] == this.currentObject[objectDef['propertyName']+'_tmprbg']['currentvalue'] )
               { this.currentObject[objectDef['propertyName']+'_tmprbg']['checked'+idx] = true;  }
           else{ this.currentObject[objectDef['propertyName']+'_tmprbg']['checked'+idx] = false; }
              
           idx++;
        });


    }




    //Date Range
    fn_OnChangeInputRangeDate(objectDef:any, objectData:any, objectDataRef:any)
    {
   
      if(objectDataRef == 1 )
      {
        var dt1 = new Date(objectData[objectDef['propertyName']]['startdate']);
        var dt2 = new Date(objectData[objectDef['propertyName']]['enddate']);
        if( dt1 >  dt2 && ( objectData[objectDef['propertyName']]['enddate'] != null || objectData[objectDef['propertyName']]['enddate'] != undefined ))
        {
          objectData[objectDef['propertyName']]['startdate'] =  objectData[objectDef['propertyName']]['enddate'] ;
        }
      }

      if(objectDataRef == 2 )
      {
        var dt1 = new Date(objectData[objectDef['propertyName']]['startdate']);
        var dt2 = new Date(objectData[objectDef['propertyName']]['enddate']);
        if( dt1 >  dt2 && ( objectData[objectDef['propertyName']]['startdate'] != null || objectData[objectDef['propertyName']]['startdate'] != undefined ))
        {
          objectData[objectDef['propertyName']]['enddate'] =  objectData[objectDef['propertyName']]['startdate'] ;
        }

      }      

     //Call Global
      this.fn_OnChangeGlobal(objectData);

    }









    //Validacion de Campos Requeridos
    fn_FormFieldValidation(objectDef:any, objectData:any){
      var classResponse ="";
      
      if(this.curflagFormValidate &&  objectDef['required'] == true )
      { 
        //For : input
         if(objectDef['controlType'] == 'input' && ( objectData[objectDef['propertyName']] == null ||  objectData[objectDef['propertyName']] == undefined || objectData[objectDef['propertyName']] == ""))
         {
          classResponse = "invalid-form-object";          
         }

        //For : textarea
         if(objectDef['controlType'] == 'textarea' && ( objectData[objectDef['propertyName']] == null ||  objectData[objectDef['propertyName']] == undefined || objectData[objectDef['propertyName']] == ""))
         {
          classResponse = "invalid-form-object";          
         }

        //For : datalist
        if(objectDef['controlType'] == 'datalist' && ( objectData[objectDef['propertyName']+'_currentvalue'] == null ||  objectData[objectDef['propertyName']+'_currentvalue'] == undefined || objectData[objectDef['propertyName']+'_currentvalue'] == ""))
        {
         classResponse = "invalid-form-object";          
        }

         //For : groupradiobutton
         if(objectDef['controlType'] == 'groupradiobutton' && ( objectData[objectDef['propertyName']+'_tmprbg']['currentvalue'] == null ||  objectData[objectDef['propertyName']+'_tmprbg']['currentvalue'] == undefined || objectData[objectDef['propertyName']+'_tmprbg']['currentvalue'] == "" || objectData[objectDef['propertyName']+'_tmprbg']['currentvalue'] == -1 ))
         {
          classResponse = "invalid-form-object";                   
         }


          //For : input DateRange
          if(objectDef['controlType'] == 'daterange' 
              && ( objectData[objectDef['propertyName']] == null ||  objectData[objectDef['propertyName']] == undefined || objectData[objectDef['propertyName']] == ""
                || objectData[objectDef['propertyName']]['startdate'] == null ||  objectData[objectDef['propertyName']]['startdate'] == undefined || objectData[objectDef['propertyName']]['startdate'] == ""
                || objectData[objectDef['propertyName']]['enddate'] == null ||  objectData[objectDef['propertyName']]['enddate'] == undefined || objectData[objectDef['propertyName']]['enddate'] == ""
                )
         )
          {
           classResponse = "invalid-form-object";          
          }


        //For : searchinput
        if(objectDef['controlType'] == 'searchinput' && ( objectData[objectDef['propertyName']] == null ||  objectData[objectDef['propertyName']] == undefined || objectData[objectDef['propertyName']] == ""))
        {
          classResponse = "invalid-form-object";          
        }

        
        //For : selectmultiple
        if(objectDef['controlType'] == 'selectmultiple' && ( objectData[objectDef['propertyName']+'_currentvalue'] == null ||  objectData[objectDef['propertyName']+'_currentvalue'] == undefined || objectData[objectDef['propertyName']+'_currentvalue'] == "" || objectData[objectDef['propertyName']+'_currentvalue'] == []))
        {
          classResponse = "invalid-form-object";          
        }

      }

     return classResponse; 
    }



    fn_FormValidation(){
    
      this.curflagFormValidate = true;
      this.curValidateDataForm = true;
      this.flagFormValidateFlag = true;

      var curGroup = [];

      if(this.currentObject != null || this.currentObject != undefined )
      {

      //Limpiar Todos los Hijos o Combos Dependientes
      this.jsonHtmlFormStructure.forEach((groupElement:any) => {
 
       curGroup = groupElement['groupConfig'];

       if(curGroup){
       curGroup.forEach((configEment:any) => {

         //Set Valdt For : input
         if( configEment['controlType'] == "input" && configEment['required'] == true ){
           if( this.currentObject[configEment['propertyName']] == null ||  this.currentObject[configEment['propertyName']] == undefined || this.currentObject[configEment['propertyName']] == "")
           {  this.curValidateDataForm = false;  }          
         }

         //Set Valdt For : textarea
         if( configEment['controlType'] == "textarea" && configEment['required'] == true ){
          if( this.currentObject[configEment['propertyName']] == null ||  this.currentObject[configEment['propertyName']] == undefined || this.currentObject[configEment['propertyName']] == "")
          {  this.curValidateDataForm = false;  }          
        }        

          //Set Valdt For : groupradiobutton 
          if( configEment['controlType'] == "groupradiobutton" && configEment['required'] == true ){
 
            if( this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] == null ||  this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] == undefined || this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] == ""  || this.currentObject[configEment['propertyName']+'_tmprbg']['currentvalue'] == -1)
            {  this.curValidateDataForm = false;  }  

         }
 
         //Set Valdt For : datalist
         if( configEment['controlType'] == "datalist" && configEment['required'] == true ){
           if( this.currentObject[configEment['propertyName']+'_currentvalue'] == null ||  this.currentObject[configEment['propertyName']+'_currentvalue'] == undefined || this.currentObject[configEment['propertyName']+'_currentvalue'] == "")
           {  this.curValidateDataForm = false;  }             
         }
   
        });
       }
 
     });
     
    }
    else{  this.curValidateDataForm = false;  }


     //Emitir Resultado de Validacion
     this.flagFormValidateFlag  = this.curValidateDataForm;
    
     this.outputValidateDataForm.emit(this.curValidateDataForm);
         
    }    

    
/*
(change)="fn_OnChangeGroupRadioButton(itemControl,currentObject,itemRadioBttn)" 
*/


//Serch Input
fn_OpenSearchInput(objectDef:any, objectData:any)
{

  const dialogConfig = new MatDialogConfig();
  /*
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {'top':'0','left':'0'};
      dialogConfig.height = '98%';
      dialogConfig.width = '100vw';
      dialogConfig.data = {'id':1,'title':'No se Encontro Datos'}; 
  */

      dialogConfig.height = objectDef['searchModelHeight'];
      dialogConfig.width = objectDef['searchModelWidth'];
      dialogConfig.data = {'objectDef':objectDef,'objectData':objectData, 'jsonLanguageTags':this.jsonLanguageTags}; 
  
      const dialog1 = this.dialog.open(DialogFormSearchInputComponent,dialogConfig);
  
      dialog1.afterClosed().subscribe(objData => {
        if(objData!= undefined &&  objData!= true){
          objectData[objectDef['propertyName']] = objData;
          objectData[objectDef['propertyName']+'_currentvalue'] = objData[objectDef['selectedDataFieldView']];
          this.fn_OnChangeSearchInput(objectDef,objectData);
        }
      });

}

fn_OnChangeSearchInput(objectDef:any, objectData:any){
   this.fn_OnChangeGlobal(objectData);
}




}























/*CODE FOR DIALOG SEARCH*/
import {HttpClient, HttpParams } from '@angular/common/http';


export interface DialogFormSearchInputData{
  title:string;
  message:string;
}


@Component({
  selector: 'dialog-form-search-input',
  templateUrl: './htmlform.searchinput.component.html',
  styleUrls: ['./htmlform.component.scss'],
})
export class DialogFormSearchInputComponent implements OnInit{


  tableClass: string='csstablesearchbase';
  objectData:any;

  inputTxtSearch:any='';

  tableStructure:any;
  tableData:any = [];
  tableDataFilter:any = [];
  tableDataSize:any = 0;
  jsonLanguageTags:any;
  dialogSearchTitle:any;

  dataSelected:any = {};
  dataSelectedField:any;

  tableCurrentPage:any=0;
  tablePageRowSize:any=5;
  tableDataMaxPage:any = 0;
  tableDataPages:any = [];
 
  tableHeightPage:any=0; 
  tableHeadLineHeightPage:any=35; 
  tableLineHeightPage:any=30; 


  enableDataApi:boolean=false;
  structureDataApi:any={};
  paramsDataApi:any=[];
  

   // Added Constructor
   constructor(public dialogRef: MatDialogRef<DialogFormSearchInputComponent>,
              @Inject(MAT_DIALOG_DATA) public data:DialogFormSearchInputData, private httpClient : HttpClient){
                  this.objectData = this.data;                                           
              }
              
   ngOnInit(){
      this.tableDataPages = [];

      var objTblDefinition = this.objectData['objectDef'];
      this.dataSelected      = {};
      this.jsonLanguageTags = this.objectData['jsonLanguageTags'];

      var objTableDataCollection = [];

      if ( objTblDefinition != null &&  objTblDefinition != undefined )
      {

        if(objTblDefinition['enableDataApi']  != null &&  objTblDefinition['enableDataApi'] != undefined )
           { this.enableDataApi = objTblDefinition['enableDataApi']; }
        if(objTblDefinition['structureDataApi']  != null &&  objTblDefinition['structureDataApi'] != undefined )
           { this.structureDataApi = objTblDefinition['structureDataApi']; }
        if(objTblDefinition['structureData']  != null &&  objTblDefinition['structureData'] != undefined )
           { this.tableStructure = objTblDefinition['structureData']; } 
        if(objTblDefinition['tablePageRowSize']  != null &&  objTblDefinition['tablePageRowSize'] != undefined )
           { this.tablePageRowSize = objTblDefinition['tablePageRowSize']; }                      
        if(objTblDefinition['selectedDataFieldView']  != null &&  objTblDefinition['selectedDataFieldView'] != undefined )
           { this.dataSelectedField = objTblDefinition['selectedDataFieldView']; }   
        if(objTblDefinition['propertyTextTitle']  != null &&  objTblDefinition['propertyTextTitle'] != undefined )
           { this.dialogSearchTitle = objTblDefinition['propertyTextTitle']; }    
 
        if(objTblDefinition['tableHeightPage']  != null &&  objTblDefinition['tableHeightPage'] != undefined )
           { this.tableHeightPage = objTblDefinition['tableHeightPage']; }    
        if(objTblDefinition['tableHeadLineHeightPage']  != null &&  objTblDefinition['tableHeadLineHeightPage'] != undefined )
           { this.tableHeadLineHeightPage = objTblDefinition['tableHeadLineHeightPage']; }               
        if(objTblDefinition['tableLineHeightPage']  != null &&  objTblDefinition['tableLineHeightPage'] != undefined )
           { this.tableLineHeightPage = objTblDefinition['tableLineHeightPage']; }    

        if(objTblDefinition['collectionData']  != null &&  objTblDefinition['collectionData'] != undefined )
           { objTableDataCollection = objTblDefinition['collectionData']; }    
            
      }


      if( this.enableDataApi == false )
      {
        this.tableData         = objTableDataCollection; 
        this.tableDataFilter   = {...this.tableData};
      if( this.tableData != null ){ this.tableDataSize = Object.keys(this.tableData).length; 
                                    this.fn_config_table_after_load(this.tableData);
                                  }
      }
      else
      { this.tableData  = [];
        this.tableDataFilter = [];
        this.tableDataSize = Object.keys(this.tableDataFilter).length;

        this.fn_config_table_after_load(this.tableData);
      }
 

    }


    fn_config_table_after_load(objTableData)
    {
      this.tableDataPages = [];
      this.tableData   = {...objTableData};
      this.tableDataFilter = {...this.tableData};
      if( this.tableData != null ){  
         this.tableDataSize    = Object.keys(this.tableData).length;
         this.tableDataMaxPage = Math.ceil(this.tableDataSize/this.tablePageRowSize);

         for(var i=0;i<this.tableDataMaxPage; i++){ this.tableDataPages.push(i); }
      }
      this.tableHeightPage = (this.tableLineHeightPage*this.tablePageRowSize + this.tableHeadLineHeightPage) + "px";

    }



    fn_searchButton(){

     if( this.enableDataApi == true )
     {  
      
     var httpMethod = this.structureDataApi['httpMethod'];

      var paramsqr:any = {}; 
      this.paramsDataApi =  this.structureDataApi['params'];
      var lparamsize = Object.keys(this.paramsDataApi).length;

      for(var i=0;i<lparamsize;i++){
        var elementobj = this.paramsDataApi[i];
        if(elementobj['type'] == 'search'){ paramsqr[elementobj['name']] = this.inputTxtSearch;  }
        if(elementobj['type'] == 'value'){ paramsqr[elementobj['name']] = elementobj['value'];  }
      }

      var bodyobject = JSON.parse(JSON.stringify(this.structureDataApi['body']));

      var paramsbody   =  this.structureDataApi['paramsbody'];
      var lparambodysize = Object.keys(paramsbody).length;

      for(var i=0;i<lparambodysize;i++){

        var elementobj = paramsbody[i];
        var namearray = elementobj['name'].split(".");
        var namearraysize = Object.keys(namearray).length;
  
        var curBodyElementEval = {};
        var idxcur = 0;
        if( namearraysize > 1 ){
          for(var j=0;j<namearraysize-1;j++){ 
              if(j==0){ curBodyElementEval = bodyobject[namearray[j]]; }
                  else{ curBodyElementEval = curBodyElementEval[namearray[j]]; }
              idxcur = j;   
          } 
          idxcur = namearraysize-1;   
        }
        else{  curBodyElementEval = bodyobject;  }

          
        if(elementobj['type'] == 'search' && (elementobj['replacevalue'] == null || elementobj['replacevalue'] == undefined) ){ curBodyElementEval[namearray[idxcur]] = this.inputTxtSearch;  }
        if(elementobj['type'] == 'search' && elementobj['replacevalue'] != null ){ curBodyElementEval[namearray[idxcur]] =  curBodyElementEval[namearray[idxcur]].replace(':'+elementobj['replacevalue'], this.inputTxtSearch);  }
        if(elementobj['type'] == 'value' && (elementobj['replacevalue'] == null || elementobj['replacevalue'] == undefined) ){ curBodyElementEval[namearray[idxcur]]  = elementobj['value'];  }
        if(elementobj['type'] == 'value' && elementobj['replacevalue'] != null ){ curBodyElementEval[namearray[idxcur]] =  curBodyElementEval[namearray[idxcur]].replace(':'+elementobj['replacevalue'], elementobj['value'] );  }
      }


 
     if( httpMethod == 'GET'){
      this.httpClient.get(this.structureDataApi['urlGateWay'], {
        headers: this.structureDataApi['httpHeader'],
        params: paramsqr
                 }).toPromise()
                   .then((response) => {
          
                      var objDataTable =  response;
                      this.tableDataFilter = objDataTable;
                      this.tableDataSize = Object.keys(this.tableDataFilter).length;
                      this.tableCurrentPage = 0;
                      this.fn_config_table_after_load(objDataTable);

                  });
      }

      if( httpMethod == 'POST'){

        this.httpClient.post(this.structureDataApi['urlGateWay'], bodyobject, {
          headers: this.structureDataApi['httpHeader'],
          params: paramsqr
                   }).toPromise()
                     .then((response) => {
            
                        var objDataTable =  response;
                        this.tableDataFilter = objDataTable;
                        this.tableDataSize = Object.keys(this.tableDataFilter).length;
                        this.tableCurrentPage = 0;
                        this.fn_config_table_after_load(objDataTable);
                    });
        } 
     }



     if( this.enableDataApi == false )
     { 
      var objDataTable = this.tableData;
      var listFilterData = [];
      var tblSizeGlbl = 0;
      var tblSize = 0;
      if( this.tableData != null ){ tblSizeGlbl = Object.keys(this.tableData).length; }
      
      tblSize =  Object.keys(this.tableStructure).length;
      for(var i=0; i<tblSizeGlbl ; i++){          
        for(var j=0 ; j<tblSize ; j++){   
        
            if( ((objDataTable[i][this.tableStructure[j]['propertyValue']]).toLowerCase()).includes(this.inputTxtSearch.toLowerCase()) == true  )
            {       
               listFilterData.push(objDataTable[i]); break;
            }
         }                     
       }

       this.tableDataFilter = listFilterData;
       this.tableDataSize = Object.keys(this.tableDataFilter).length;

     }


    }



   fn_tableDataPagAdd()
   { 
      if( this.tableCurrentPage*this.tablePageRowSize < this.tableDataSize -this.tablePageRowSize)
      { this.tableCurrentPage = this.tableCurrentPage+1; }
   }

   fn_tableDataPagSubstrct()
   { 
      if( this.tableCurrentPage > 0 )
      { this.tableCurrentPage = this.tableCurrentPage-1; }
   }

   fn_tableDataPagination(){
      var curPage      = this.tableCurrentPage;
      var objDataTable = this.tableDataFilter;
      var listFilterData = [];
      var curIndx = 0;
      var tblSize = 0;
      curIndx = curPage*this.tablePageRowSize;
      tblSize = curIndx+this.tablePageRowSize;
      for(var i=curIndx; i<tblSize && i<this.tableDataSize ; i++){ listFilterData.push(objDataTable[i]); }
      return listFilterData;
   } 
  

   fn_tableDataPagChange(vnNumero:any)
   { this.tableCurrentPage = this.tableDataPages[vnNumero]; }      


   fn_tableGetCurPageClass(vnNumero:any){

     var curClass='';       
     if( this.tableCurrentPage == this.tableDataPages[vnNumero] )
         { curClass = 'csstablebase_button_page_selected'; }
     else{ curClass = 'csstablebase_button_page'; }
                   
     return curClass;
   }















  fn_clickSelected(objDataSelected:any){

    this.dataSelected      = objDataSelected;

  }  
            

 onConfirm():void{
   this.dialogRef.close(this.dataSelected);
 }

 onDismiss():void{
   this.dialogRef.close(true);
}


}
