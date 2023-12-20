import { Component, OnInit, Input,  SimpleChanges, ViewChild , Output, EventEmitter ,Inject , ChangeDetectorRef} from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
//import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'ps-html-table',
    templateUrl: './htmltable.component.html',
    styleUrls: ['./htmltable.component.scss'],
  })
export class HtmlTableComponent implements OnInit {


    @Input() jsonHtmlTableStructure: any;
    @Input() jsonLanguageTags: any;
    @Input() tableClass: string='csstablebase';

    @Input() flagTableReadOnly: boolean=false;
    @Input() flagTableValidate: boolean=false;
    
    @Input() inputChanges: number=0;
    @Input() inputDataObject: any;
    @Input() tableTitle: any;

    @Input() tablePageRowSize:any=5;
    @Input() tableHeadLineHeightPage:any=35; 
    @Input() tableLineHeightPage:any=30; 

    @Output() outputDataTable = new EventEmitter<any>();
    @Output() outputCurrentDataItemTable = new EventEmitter<any>();
    @Output() outputValidateDataTable = new EventEmitter<any>();

    
    tableformClass: string='cssformbase';
    curflagTableValidate: boolean=false;    
    curValidateDataTable: boolean=true;    
    itemControl:any;
    currentObject :any;
    flagValueTrue:boolean = true;

    inputTxtSearch:any='';
    tableData:any = [];
    tableDataFilter:any = [];
    tableDataSize:any = 0;
    tableDataMaxPage:any = 0;
    tableDataPages:any = [];

    tableDataHeaderShow:boolean = false;

    tableCurrentPage:any=0; 
    tableHeightPage:any=0; 

    constructor(public dialog: MatDialog ,private cd: ChangeDetectorRef) {}
    
    ngOnInit(){
        this.tableDataPages = [];
        this.currentObject  = {};

        this.tableDataHeaderShow = false;

        //this.jsonHtmlFormStructure = JSON.parse(this.htmlFormStructure);
     
        this.tableData   = {...this.inputDataObject};
        this.tableDataFilter   = {...this.tableData};
        if( this.tableData != null ){  
           this.tableDataSize    = Object.keys(this.tableData).length;
           this.tableDataMaxPage = Math.ceil(this.tableDataSize/this.tablePageRowSize);

           for(var i=0;i<this.tableDataMaxPage; i++){ this.tableDataPages.push(i); }
        }
        this.tableHeightPage = (this.tableLineHeightPage*this.tablePageRowSize + this.tableHeadLineHeightPage) + "px";

        // this.tableHeightPage ="400px"; 

        this.fn_InitTableElements();                
      }

      ngOnChanges(changes: SimpleChanges){
        this.ngOnInit();    
     }
   
      


      fn_getheadershowhide()
      {
        var i=0;
        if( this.tableDataHeaderShow == true && i==0){ i=1; this.tableDataHeaderShow =false; }
        if( this.tableDataHeaderShow == false && i==0 ){ i=1; this.tableDataHeaderShow =true; }
      }


      fn_gettablestructure()
      {
        var lstructure = [];
        var lsize = Object.keys(this.jsonHtmlTableStructure).length;

        for(var i=0; i<lsize ;i++){
            if( this.jsonHtmlTableStructure[i]['visible'] == true)
            { lstructure.push(this.jsonHtmlTableStructure[i]);   }
        }

        return lstructure;
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



      fn_searchTableButton(){
    
           var objDataTable = this.tableData;
           var listFilterData = [];
           var tblSizeGlbl = 0;
           var tblSize = 0;
           if( this.tableData != null )
           { tblSizeGlbl = Object.keys(this.tableData).length; }
           
           tblSize =  Object.keys(this.jsonHtmlTableStructure).length;
           for(var i=0; i<tblSizeGlbl ; i++){          
             for(var j=0 ; j<tblSize ; j++){         
  
               if(this.jsonHtmlTableStructure[j]['searchflag'] == true )
                 if( ( !(this.jsonHtmlTableStructure[j]['controlType']  in {'searchinput':1,'datalist':1}) && ((objDataTable[i][this.jsonHtmlTableStructure[j]['propertyName']]).toLowerCase()).includes(this.inputTxtSearch.toLowerCase()) == true  )
                    || ( this.jsonHtmlTableStructure[j]['controlType'] == 'searchinput' && ((objDataTable[i][this.jsonHtmlTableStructure[j]['propertyName']][this.jsonHtmlTableStructure[j]['selectedDataFieldView']]).toLowerCase()).includes(this.inputTxtSearch.toLowerCase()) == true  )
                    )
                 {   
                    listFilterData.push(objDataTable[i]); break;
                 }
              }                     
            }
     
            this.tableDataFilter = listFilterData;
            this.tableDataSize = Object.keys(this.tableDataFilter).length;  
            this.tableDataMaxPage = Math.ceil(this.tableDataSize/this.tablePageRowSize);   
            this.tableDataPages=[];
            for(var i=0;i<this.tableDataMaxPage; i++){ this.tableDataPages.push(i); }
            this.tableCurrentPage = 0;
      }




      fn_ngClassEval()
      {
        var responseClass = "";
        if(this.flagTableReadOnly == false){ responseClass = this.tableformClass; }
        if(this.flagTableReadOnly == true){ responseClass = this.tableformClass +" "+"cssReadOnly"; }
        return responseClass;
      }


      fn_InitTableElements(){

        //var lsize = Object.keys(this.jsonHtmlTableStructure).length;
        
        var idx=0;
        for(var i=0;i<this.tableDataSize;i++)
        {

          this.jsonHtmlTableStructure.forEach( element => {

             if( element['controlType'] == 'searchinput' ){            
                 if( this.tableData[i][element['propertyName']] != null ){
                    this.tableData[i][element['propertyName']+'_currentvalue'] =  this.tableData[i][element['propertyName']][element['selectedDataFieldView']];                   
                 }                          
             }


             if( element['controlType'] == 'datalist' ){            
              if( this.tableData[i][element['propertyName']] != null ){
                 this.tableData[i][element['propertyName']+'_currentvalue'] =  this.tableData[i][element['propertyName']][element['selectedDataFieldView']];                   
              }                          
             }           
         
          });
      
        }

      }


      fn_checkDateType(obj:any){      
          return obj instanceof Date == undefined;
      }


       /* Data List - Filtros  */


     //On Change Generico para Data Lists
     fn_OnChangeInputDataList(objectDef:any, objectData:any){

      var listData = [];
      var dataTextValue = "";
      dataTextValue = objectData[objectDef['propertyName']+'_currentvalue'];
      
      listData = objectDef['collectionData'];
      var flagFound = false; 
      var curObjet = {}; 
      var lsize = 0; lsize = Object.keys(listData).length;
      for( var i=0;i<lsize;i++ )
      { if( listData[i][objectDef['propertyDataListItemName']]  == dataTextValue ){ flagFound = true;  curObjet = listData[i]; break; }  }

      objectData[objectDef['propertyName']] =  curObjet;
    
      //Limpiar Todos los Hijos o Combos Dependientes
      this.fn_recursive_clean_datalist_fields(objectDef['propertyName'],objectData);
      //Call Global
      //this.fn_OnChangeGlobal(objectData);
    }


    fn_recursive_clean_datalist_fields(objPropertyName:any, objCurrent:any){
       
     //Limpiar Todos los Hijos o Combos Dependientes
     this.jsonHtmlTableStructure.forEach((rowElement:any) => {
  
       if( rowElement['propertyDataListFilterPropertyName'] == objPropertyName ){
           objCurrent[rowElement['propertyName']] = {};
           objCurrent[rowElement['propertyName']+'_currentvalue'] = "";

          this.fn_recursive_clean_datalist_fields(rowElement['propertyName'],objCurrent);         
         }       
    });

    }





    fn_DataListFilter(objectDef:any, objectDataList:any, objCurrent:any):any[]{

        var listDataListFilter:any[]=[];
        var idFilter:any = null;
  
        if( objectDef['propertyDataListFilterPropertyName'] != null && objectDef['propertyDataListFilterId'] != null && objectDef['propertyDataListItemParentId'] != null )
        {
          //Data Con filtro
          if(objCurrent[objectDef['propertyDataListFilterPropertyName']] != null && objCurrent[objectDef['propertyDataListFilterPropertyName']][objectDef['propertyDataListFilterId']] != null)
          {
             idFilter = objCurrent[objectDef['propertyDataListFilterPropertyName']][objectDef['propertyDataListFilterId']];
  
             objectDataList.forEach((curObj: any) => {
              if(curObj[objectDef['propertyDataListItemParentId']] == idFilter )
              {  listDataListFilter.push(curObj);  }
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







  /*START -  On Change Events*/
  fn_OnChangeInputText(objectDef:any, objectData:any){

      //Call Global
     // this.fn_OnChangeGlobal(objectData);
  }


  fn_OnChangeInputNumber(objectDef:any, objectData:any){

    //Call Global
   // this.fn_OnChangeGlobal(objectData); 
  }

  fn_OnChangeInputCheckbox(objectDef:any, objectData:any){

    //Call Global
   // this.fn_OnChangeGlobal(objectData);
  }

  fn_OnChangeInputDate(objectDef:any, objectData:any){

    //Call Global
   //this.fn_OnChangeGlobal(objectData);
  }  

  fn_OnChangeSearchInputText(objectDef:any, objectData:any){

    //Call Global
   // this.fn_OnChangeGlobal(objectData);
}




  fn_OnEventTableMenu( objectData:any, refEvent:any ,idx:any){

    var objResponse:any= {};
    objResponse['event'] = refEvent;
    objResponse['data'] = objectData;
    objResponse['idx'] = idx;

    //Call Global
    this.outputCurrentDataItemTable.emit(objResponse);
  } 


   






  //Validacion de Campos Requeridos
  fn_FormFieldValidation(objectDef:any, objectData:any){
    var classResponse ="";
    
    if(this.curflagTableValidate &&  objectDef['required'] == true )
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

    }

   return classResponse; 
  }








  //Serch Input
fn_OpenSearchInput(objectDef:any, objectData:any, objIdx:any)
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
  
      const dialog1 = this.dialog.open(DialogTableSearchInputComponent,dialogConfig);
  
      dialog1.afterClosed().subscribe(objData => { 
        if(objData!= undefined &&  objData!= true){ 
          objectData[objectDef['propertyName']] = objData;
          objectData[objectDef['propertyName']+'_currentvalue'] = objData[objectDef['selectedDataFieldView']];
          this.fn_OnChangeSearchInput(objectDef,objectData);
          this.cd.detectChanges();   
        }
      });

}


fn_OnChangeSearchInput(objectDef:any, objectData:any){
 //  this.fn_OnChangeGlobal(objectData);
}






}





























/*CODE FOR DIALOG SEARCH*/
import {HttpClient, HttpParams } from '@angular/common/http';


export interface DialogTableSearchInputData{
  title:string;
  message:string;
}


@Component({
  selector: 'dialog-form-search-input',
  templateUrl: './htmltable.searchinput.component.html',
  styleUrls: ['./htmltable.component.scss'],
})
export class DialogTableSearchInputComponent implements OnInit{


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
   constructor(public dialogRef: MatDialogRef<DialogTableSearchInputComponent>,
              @Inject(MAT_DIALOG_DATA) public data:DialogTableSearchInputData, private httpClient : HttpClient){
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

