import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';

import { AgrupadorModel, EmpresaCultivoModel } from '../../../../../../../core/_models';
import { UtilsService, AgrupadorService } from '../../../../../../../core/_services'
import { LayoutUtilsService } from '../../../../../../../core/_base/crud';
import { TYPE_ALERT, MESSAGE_ALERT_VALIDATIONS } from '../../../../../../../core/_constantes/constantes';
import { currentCultivo, currentUser, User } from '../../../../../../../core/auth';
import { AppState } from '../../../../../../../core/reducers';

import { combineLatest, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'kt-agrupador-registro',
  templateUrl: './agrupador-registro.component.html',
  styleUrls: ['./agrupador-registro.component.scss']
})
export class AgrupadorRegistroComponent implements OnInit {

  registro:AgrupadorModel;
  listadoIdsRegistro:any[]=[];
  registroForm:FormGroup;
  hasFormErrors:boolean;
  viewLoading:boolean;

  listadoCboTipoConfig:any[] = []
  
  typeAlert:String
  messageAlert:String

  // Selection
  selectionResult = new SelectionModel<any>(true, []);
  dataSourceResult:any[] = [];
  dataSource:MatTableDataSource<any>;
  displayedColumns = ["select", "itemCodigo", "itemNombre", "itemDescripcion"];
  pageSizeOptions:any[] = [20,40,50];
  
  @ViewChild('matPaginator', {static:true}) paginator:MatPaginator;
  @ViewChild('sort1', {static:true}) sort:MatSort;
  
  subscriptions:Subscription[] = [];
  currentUsuario:User=undefined;
  currentCultivo:EmpresaCultivoModel=undefined;

  validations = {
    configuracionNombre: [ { name: 'required', message: 'Ingrese un nombre de agrupador' } ],
    tipoConfiguracionId: [ { name: 'min', message: 'Seleccione un tipo de configuración.' }],
  }

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder,
    private agrupadorService:AgrupadorService,
    private layoutUtilsService:LayoutUtilsService,
    private utilsService:UtilsService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.registro = new AgrupadorModel();
    this.registro.clear()
    this.createForm();
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data=>{
      if(data.param){
        this.registro = data.param
        this.registroForm.controls["configuracionId"].setValue(this.registro.configuracionId)
        this.registroForm.controls["configuracionNombre"].setValue(this.registro.configuracionNombre)
        this.listadoIdsRegistro = this.registro.condiguracionIdentificadores.split('|');
      }
    });
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(combineLatest(
      this.store.pipe(select(currentUser)),
      this.store.pipe(select(currentCultivo)))
      .pipe(filter(e => !e.includes(null)),tap(([resUsuario, resCultivo]) => {
        if(resUsuario && resCultivo){
          /*if(this.registro.configuracionId>0 && this.registro.cultivoId!=resCultivo.cultivoID){
            this.router.navigate(['/seguridad/agrupadores']);
          }else{*/
          this.currentCultivo=resCultivo
          this.currentUsuario=resUsuario;
          this.registroForm.controls["cultivoNombre"].setValue(this.currentCultivo.cultivoNombre)
          this.utilsService.listarCombo$({option:53}).subscribe(
            result => {
              this.listadoCboTipoConfig = result.data.table;
              this.registroForm.controls["tipoConfiguracionId"].setValue(this.registro.tipoConfiguracionId)
            }
          );
          /*}*/
        }
      }
    )).subscribe());
  }

  ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  createForm() {
    this.registroForm = this.fb.group({
      configuracionId: [{value: this.registro.configuracionId,disabled:!this.registro.status}, Validators.min(0)],
      configuracionNombre: [{value:this.registro.configuracionNombre,disabled:!this.registro.status}, Validators.required],
      cultivoNombre: [{value:"",disabled:true}],
      status: [{value:this.registro.status,disabled:!this.registro.status}],
      tipoConfiguracionId: [{value: this.registro.tipoConfiguracionId,disabled:!this.registro.status}, Validators.min(0)]
    });

    this.registroForm.controls['tipoConfiguracionId'].valueChanges.subscribe((value) => {
      if(value>0){
        this.viewLoading=true;
        this.agrupadorService.listarTipoConfiguracion$({tipo:value,codigos:this.listadoIdsRegistro,valorID:this.registro.configuracionId}).subscribe(result=>{
          this.viewLoading=false;
          if(this.registro.configuracionId==0)this.listadoIdsRegistro=[];
          
          this.selectionResult = new SelectionModel<any>(true, []);
          this.dataSourceResult = result.data;
          this.dataSource = new MatTableDataSource(this.dataSourceResult);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
          this.dataSourceResult.forEach(itemConfig => {
            this.listadoIdsRegistro.forEach(idSelect => {
              if(+idSelect === itemConfig.itemId) this.selectionResult.select(itemConfig)
            })
          })
        },error=>{
          console.log(error);
          this.viewLoading=false;
        });
      }else{
        this.selectionResult = new SelectionModel<any>(true, []);
        this.dataSourceResult = [];
        this.dataSource = new MatTableDataSource(this.dataSourceResult)
      }
    });
  }

	getTitle():string {
		if (this.registro.configuracionId > 0) return !this.registro.status ? `Ver Perfil de Actividades '${this.registro.configuracionNombre}'` : `Editar Perfil de Actividades '${this.registro.configuracionNombre}'`;
		return 'Nuevo Perfil de Actividades';
  }

	isControlInvalid(controlName:string): boolean {
		const control = this.registroForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
  }

  guardarRegistro() {
    this.hasFormErrors = false;
    const controls = this.registroForm.controls;
    if (this.registroForm.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched()
      });
      return this.showWarning(MESSAGE_ALERT_VALIDATIONS)
    }

    const registroDatos = this.registroForm.getRawValue();
    if(this.selectionResult.selected.length == 0) return this.showWarning("Debe selecionar al menos un item para guardar el agrupador.")
    
    const identificadores:number[] = [];
    this.selectionResult.selected.forEach(item => {identificadores.push(item.itemId)});

    registroDatos.cultivoId=this.currentCultivo.cultivoID;
    registroDatos.condiguracionIdentificadores=identificadores.join('|');
    registroDatos.userName=this.currentUsuario.usuarioWebLogin;

    this.viewLoading=true;
    if (registroDatos.configuracionId == 0){
      this.agrupadorService.insertarRegistro$(registroDatos).subscribe(
        result => {
          this.viewLoading=false;
          this.resultMessage(result);
          this.ref.detectChanges();
        },
        error =>{
          this.viewLoading=false;
          this.showError(error);
          this.ref.detectChanges();
        }
      );
    }
    else {
      this.agrupadorService.actualizarRegistro$(registroDatos).subscribe(
        result => {
          this.viewLoading=false;
          this.resultMessage(result);
          this.ref.detectChanges();
        },
        error => {
          this.viewLoading=false;
          this.showError(error);
          this.ref.detectChanges();
        }
      );
    }
  }

  resultMessage(resultServer:any) {
    if(resultServer.statusCode == 200) {
      this.layoutUtilsService.showActionNotification(resultServer.message, null,3000,true,false);
      this.router.navigate(['/seguridad/agrupadores']);
    }else {
      this.hasFormErrors = true;
      this.typeAlert = TYPE_ALERT.WARNING;
      this.messageAlert = resultServer.message
    }
  }

  showError(e) {
    if(e.error) e = e.error;
    this.hasFormErrors = true;
    this.typeAlert = TYPE_ALERT.DANGER
    this.messageAlert = e.message
  }

  showWarning(message:String) {
    this.hasFormErrors = true;
    this.typeAlert = TYPE_ALERT.WARNING;
    this.messageAlert = message;
  }

  onAlertClose(){
    this.hasFormErrors = false
  }

  masterToggle() {
    if (this.isAllSelectedRegistros() || this.selectionResult.selected.length>0) {
      this.selectionResult.clear();
    } else {
      if(this.dataSource.filteredData.length>0){
        this.selectionResult.clear();
        this.dataSourceResult.forEach(row => {
          if(this.dataSource.filteredData.filter(x=>x.itemId===row.itemId).length>0){
            this.selectionResult.select(row)
          }
        });
      }else{
        this.dataSourceResult.forEach(row => this.selectionResult.select(row));
      }
    }
  }

  isAllSelectedRegistros() {
    const numSelected = this.selectionResult.selected.length;
    const numRows = this.dataSourceResult.length;
    return numSelected === numRows;
  }

  isAllFilterSelectedRegistros() {
    const numSelected = this.selectionResult.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

}
