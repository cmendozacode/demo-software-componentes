import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel, EmpresaModel, TipoUsuarioModel,
  PerfilModel, EstadoModel, ComboGenericoModel, ConfigModel, TrabajadorModel } from '../../../../../../../core/_models';
import { UsuarioService, UtilsService, TrabajadorService } from '../../../../../../../core/_services'
import { LayoutUtilsService } from '../../../../../../../core/_base/crud';
import { TYPE_ALERT, MESSAGE_ALERT_VALIDATIONS } from '../../../../../../../core/_constantes/constantes';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { currentEmpresa, currentUser, User } from '../../../../../../../core/auth';
import { AppState } from '../../../../../../../core/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kt-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.scss']
})
export class UsuarioRegistroComponent implements OnInit {

  registro:UsuarioModel;
  registroForm:FormGroup;
  hasFormErrors:boolean;
  viewLoading:boolean;

  listadoCboEmpresas:EmpresaModel[] = []
  listadoCboTiposUsuario:TipoUsuarioModel[] = []
  listadoCboPerfilesWeb:PerfilModel[] = []
  listadoCboPerfilesMovil:PerfilModel[] = []
  listadoCboEstados:EstadoModel[] = []
	listadoCboAreas:ComboGenericoModel[] = []
  listadoCboBandejas:ComboGenericoModel[] = []
  listadoCboCAE:ComboGenericoModel[] = []
  listadoCboAcopiosComedor:ComboGenericoModel[] = []
  listadoCboTipoConfiguracion:ConfigModel[] = []
  listadoCboConfiguracion:ConfigModel[] = []
  filtradoCboConfiguracion:ConfigModel[] = []

  typeAlert:String
  messageAlert:String
  selectedTab = 0

  dataSource:MatTableDataSource<EmpresaModel>;
  displayedColumns = ["select", "empresaRUC", "empresaNombre", "empresaDireccion", "empresaAbreviatura", "empresaDefault"];
  loading:boolean;

  // Selection
  selection = new SelectionModel<EmpresaModel>(true, []);
  listadoResult:EmpresaModel[] = []

  dataSourcePW:MatTableDataSource<PerfilModel>;
  dataSourcePM:MatTableDataSource<PerfilModel>;
  displayedColumnsPWM = ["perfilDescripcion", "actions"];
  listadoResultPW:PerfilModel[] = []
  listadoResultPM:PerfilModel[] = []

  dataSourceConfig:MatTableDataSource<ConfigModel>;
  displayedColumnsConfig = ["tipoDescripcion", "configDescripcion", "actions"];
  listadoResultConfig:ConfigModel[] = []

  currentTrabajador:TrabajadorModel;

  empresa$:Observable<EmpresaModel>=this.store.pipe(select(currentEmpresa));
  subscriptions:Subscription[] = [];
  currentUsuario:User=undefined;

  loginPasswordWeb = false;
  loginPasswordMovil = false;

  constructor(
    private store: Store<AppState>,
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private trabajadorService:TrabajadorService,
    private layoutUtilsService:LayoutUtilsService,
    private utilsService:UtilsService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.registro = new UsuarioModel();
    this.registro.clear()
    this.currentTrabajador = new TrabajadorModel();
    this.currentTrabajador.clear()
    // this.listarCombos(10);
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data => {
      if(data.param) this.listarCombos(10, data.param)
      else this.listarCombos(10);
    })

    const usuarioSubscription = this.store.pipe(select(currentUser)).subscribe(res =>{
			if(res){
				this.currentUsuario=res
			}
    });

    this.subscriptions.push(usuarioSubscription);
    this.createForm();
  }

  ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
  }

  getInformacionUsuario(dataHeader) {
    this.registro = dataHeader
    this.registro.usuarioDNI = dataHeader.usuarioCodigo;
    //this.loginPasswordWeb = this.registro.usuarioWeb;
    //this.loginPasswordMovil = this.registro.usuarioMovil;

    const controls = this.registroForm.controls;
    controls.empresaID.setValue(this.registro.empresaID)
    if(this.registro.disabled) controls.empresaID.disable();
    controls.usuarioTipoID.setValue(this.registro.usuarioTipoID)
    if(this.registro.disabled) controls.usuarioTipoID.disable();
    controls.usuarioDNI.setValue(this.registro.usuarioDNI)
    if(this.registro.disabled) controls.usuarioDNI.disable();
    controls.usuarioCorreo.setValue(this.registro.usuarioCorreo)
    if(this.registro.disabled) controls.usuarioCorreo.disable();
		controls.usuarioTelefono.setValue(this.registro.usuarioTelefono)
    if(this.registro.disabled) controls.usuarioTelefono.disable();
    controls.usuarioWeb.setValue(this.registro.usuarioWeb)
    if(this.registro.disabled) controls.usuarioWeb.disable();
    controls.usuarioMovil.setValue(this.registro.usuarioMovil)
    if(this.registro.disabled) controls.usuarioMovil.disable();
    controls.usuarioStatus.setValue(this.registro.usuarioStatus)
    if(this.registro.disabled) controls.usuarioStatus.disable();

    this.currentTrabajador.trabajadorID = this.registro.usuarioIDReferencia
    this.currentTrabajador.trabajadorNroDocumento = this.registro.usuarioDNI
    this.currentTrabajador.trabajadorNombreCompleto = this.registro.usuarioNombreCompleto
    this.usuarioService.obtenerRegistro$(this.registro.usuarioID).subscribe(
      result => {
        const usuario:UsuarioModel = result.data;

        this.listadoResult.forEach(empresa => {
          usuario.usuarioEmpresas.forEach(emp => {
            if(empresa.empresaID == emp.empresaID) this.selection.select(empresa)
          })
        })
        // console.log(this.registro)
        this.registro.usuarioWebID = usuario.usuarioWebID;
        this.registro.usuarioWebLogin = usuario.usuarioWebLogin;
        if(usuario.usuarioWebPassword != null) this.registro.usuarioWebPassword = usuario.usuarioWebPassword
        this.registro.webEstadoID = usuario.webEstadoID;
        this.registro.usuarioWebStatus = usuario.usuarioWebStatus;
        this.registro.usuarioMovilID = usuario.usuarioMovilID;
        this.registro.usuarioMovilLogin = usuario.usuarioMovilLogin;
        if(usuario.usuarioMovilPassword != null) this.registro.usuarioMovilPassword = usuario.usuarioMovilPassword
        this.registro.movilEstadoID = usuario.movilEstadoID;
				this.registro.areaID = usuario.areaID;
        this.registro.usuarioMovilStatus = usuario.usuarioMovilStatus;

        if(usuario.usuarioWeb) {
          this.formControlValidationsWebChanged()
          this.listadoResultPW = usuario.detallePerfilesWeb;
          controls.usuarioWebLogin.setValue(this.registro.usuarioWebLogin)
          if(this.registro.disabled) controls.usuarioWebLogin.disable();
          controls.usuarioWebPassword.setValue(this.registro.usuarioWebPassword)
          if(this.registro.disabled) controls.usuarioWebPassword.disable();
          controls.webEstadoID.setValue(this.registro.webEstadoID)
          if(this.registro.disabled) controls.webEstadoID.disable();
          controls.usuarioWebStatus.setValue(this.registro.usuarioWebStatus)
          if(this.registro.disabled) controls.usuarioWebStatus.disable();
        }

        if(usuario.usuarioMovil && usuario.movilBacoCod != null && usuario.movilCAECod != null && usuario.movilAcopioComedorCod != null) {
          this.formControlValidationsMovilChanged()
          this.listadoResultPM = usuario.detallePerfilesMovil;
          this.listadoResultConfig = usuario.detalleConfiguraciones;
          if(!this.listadoResultConfig) this.listadoResultConfig=[]
          controls.usuarioMovilLogin.setValue(this.registro.usuarioMovilLogin)
          if(this.registro.disabled) controls.usuarioMovilLogin.disable();
          controls.usuarioMovilPassword.setValue(this.registro.usuarioMovilPassword)
          if(this.registro.disabled) controls.usuarioMovilPassword.disable();
          controls.movilEstadoID.setValue(this.registro.movilEstadoID)
          if(this.registro.disabled) controls.movilEstadoID.disable();
					controls.areaID.setValue(this.registro.areaID)
          if(this.registro.disabled) controls.areaID.disable();
          controls.usuarioMovilStatus.setValue(this.registro.usuarioMovilStatus)
          if(this.registro.disabled) controls.usuarioMovilStatus.disable();

          this.registro.movilBacoID = []
          let movilBacoCod:string[] = usuario.movilBacoCod.split(",")
          if(movilBacoCod.length > 0) {
            movilBacoCod.forEach(item=>{
              if(item.trim().length > 0) this.registro.movilBacoID.push(parseInt(item))
            })
          }
          controls.movilBacoID.setValue(this.registro.movilBacoID)
          if(this.registro.disabled) controls.movilBacoID.disable();
          this.registro.movilCAEID = []
          let movilCAECod:string[] = usuario.movilCAECod.split(",")
          if(movilCAECod.length > 0) {
            movilCAECod.forEach(item=>{
              if(item.trim().length > 0) this.registro.movilCAEID.push(parseInt(item))
            })
          }
          controls.movilCAEID.setValue(this.registro.movilCAEID)
          if(this.registro.disabled) controls.movilCAEID.disable();
          this.registro.movilAcopioComedorID = []
          let movilAcopioComedorCod:string[] = usuario.movilAcopioComedorCod.split(",")
          if(movilAcopioComedorCod.length > 0) {
            movilAcopioComedorCod.forEach(item=>{
              if(item.trim().length > 0) this.registro.movilAcopioComedorID.push(parseInt(item))
            })
          }
          controls.movilAcopioComedorID.setValue(this.registro.movilAcopioComedorID)
          if(this.registro.disabled) controls.movilAcopioComedorID.disable();
          this.dataSourceConfig = new MatTableDataSource(this.listadoResultConfig)
        }
      },
      error => this.showError(error)
    )
  }

  listarCombos(option:number, usuarioEdit:any = null) {
    if(this.listadoCboEmpresas.length > 0 && option == 10) return false;
    if(this.listadoCboPerfilesWeb.length > 0 && option == 11) return false;
    if(this.listadoCboPerfilesMovil.length > 0 && option == 12) return false;
    this.subscriptions.push(this.empresa$.subscribe(res=>{
      if(res){
        this.utilsService.listarCombo$({option:option}).subscribe(
          result => {
            if(option == 10) {
              this.listadoCboEmpresas = result.data.table
              this.listadoCboTiposUsuario = result.data.table1

              this.loading = true;
              this.listadoResult = this.listadoCboEmpresas;
              this.dataSource = new MatTableDataSource(this.listadoResult)
              this.loading = false;
              this.selection = new SelectionModel<EmpresaModel>(true, []);
              if(usuarioEdit != null) this.getInformacionUsuario(usuarioEdit)
            }else if(option == 11) {
              this.listadoCboEstados = result.data.table
              this.listadoCboPerfilesWeb = result.data.table1

              this.loading = true;
              this.dataSourcePW = new MatTableDataSource(this.listadoResultPW)
              this.loading = false;
            }else if(option == 12) {
              this.listadoCboEstados = result.data.table
              this.listadoCboPerfilesMovil = result.data.table1
              this.listadoCboBandejas = result.data.table2
              this.listadoCboCAE = result.data.table3//.filter(f=>f.empresaID == res.empresaID)
              this.listadoCboAcopiosComedor = result.data.table4
              this.listadoCboTipoConfiguracion = result.data.table5
              this.listadoCboConfiguracion = result.data.table6
							this.listadoCboAreas = result.data.table7

              this.loading = true;
              this.dataSourcePM = new MatTableDataSource(this.listadoResultPM)
              this.loading = false;
            }
          },
          error => this.showError(error)
        )
      }
    }))
  }

  validations = {
    empresaID: [ { name: 'min', message: 'Debe seleccionar una empresa.' }],
    usuarioTipoID: [ { name: 'min', message: 'Debe seleccionar un tipo de usuario.' }],
    usuarioDNI: [ { name: 'minlength', message: 'Documento inválido' } ],
    usuarioCorreo: [ { name: 'required', message: 'Debe ingresar su correo.' }],
		usuarioTelefono: [ { name: 'minlength', message: 'Mínimo 6 dígitos.' } ],
    usuarioWebLogin: [ { name: 'required', message: 'Debe ingresar su Login Web.' }],
    usuarioWebPassword: [ { name: 'required', message: 'Debe ingresar su Password Web.' }],
    webEstadoID: [ { name: 'min', message: 'Debe seleccionar un estado para el Usuario Web.' }],
    usuarioMovilLogin: [ { name: 'required', message: 'Debe ingresar su Login Movil.' }],
    usuarioMovilPassword: [ { name: 'required', message: 'Debe ingresar su Password Movil.' }],
    movilEstadoID: [ { name: 'min', message: 'Debe seleccionar un estado para el Usuario Movil.' }],
  }

  createForm() {
    this.registroForm = this.fb.group({
      empresaID: [{value: this.registro.empresaID,disabled:this.registro.disabled}, Validators.min(1)],
      usuarioTipoID: [{value:this.registro.usuarioTipoID,disabled:this.registro.disabled}, Validators.min(1)],
      usuarioIDReferencia: [this.registro.usuarioIDReferencia],
      usuarioDNI: [{value:this.registro.usuarioDNI,disabled:this.registro.disabled}, [Validators.required, Validators.minLength(8)]],
      usuarioCorreo: [{value:this.registro.usuarioCorreo,disabled:this.registro.disabled}],
			usuarioTelefono: [{value:this.registro.usuarioTelefono,disabled:this.registro.disabled}, Validators.minLength(8)],
      usuarioStatus: [{value:this.registro.usuarioStatus,disabled:this.registro.disabled}],
      usuarioWeb: [{value:this.registro.usuarioWeb,disabled:this.registro.disabled}],
      usuarioWebLogin: [this.registro.usuarioWebLogin],
      usuarioWebPassword: [this.registro.usuarioWebPassword],
      webEstadoID: [{value:this.registro.webEstadoID,disabled:this.registro.disabled}],
      webPerfilID: [{value:0,disabled:this.registro.disabled}],
      usuarioWebStatus: [{value:this.registro.usuarioWebStatus,disabled:this.registro.disabled}],
      usuarioMovil: [{value:this.registro.usuarioMovil,disabled:this.registro.disabled}],
      usuarioMovilLogin: [{value:this.registro.usuarioMovilLogin,disabled:this.registro.disabled}],
      usuarioMovilPassword: [{value:this.registro.usuarioMovilPassword,disabled:this.registro.disabled}],
      movilEstadoID: [{value:this.registro.movilEstadoID,disabled:this.registro.disabled}],
			areaID: [{value:this.registro.areaID,disabled:this.registro.disabled}],
      movilPerfilID: [{value:0,disabled:this.registro.disabled}],
      usuarioMovilStatus: [{value:this.registro.usuarioMovilStatus,disabled:this.registro.disabled}],
      movilBacoID: [{value:this.registro.movilBacoID,disabled:this.registro.disabled}],
      movilCAEID: [{value:this.registro.movilCAEID,disabled:this.registro.disabled}],
      movilAcopioComedorID: [{value:this.registro.movilAcopioComedorID,disabled:this.registro.disabled}],
      tipoConfiguracionID: [{value:0,disabled:this.registro.disabled}],
      configuracionID: [{value:0,disabled:this.registro.disabled}]

    });
    this.registroForm.controls['empresaID'].valueChanges.subscribe((value) => {
      if(value > 0) {
        this.listadoResult.forEach(empresa => {
          if(empresa.empresaID == value){
            this.selection.select(empresa);
            empresa.empresaDefault = true
          }
          else empresa.empresaDefault = false
        })
      }
    });

    this.registroForm.controls['tipoConfiguracionID'].valueChanges.subscribe((value) => {
      if(value > 0) this.filtradoCboConfiguracion = this.listadoCboConfiguracion.filter(f=>f.tipoID == value)
    });
  }

  formControlValidationsWebChanged() {
    const usuarioWebLoginControl = this.registroForm.get('usuarioWebLogin')
    const usuarioWebPasswordControl = this.registroForm.get('usuarioWebPassword')
    const webEstadoIDControl = this.registroForm.get('webEstadoID')
    if(this.registro.usuarioWeb){
      usuarioWebLoginControl.setValidators([Validators.required])
      usuarioWebPasswordControl.setValidators([Validators.required])
      webEstadoIDControl.setValidators([Validators.min(1)])
    } else {
      usuarioWebLoginControl.clearValidators()
      usuarioWebPasswordControl.clearValidators()
      webEstadoIDControl.clearValidators()
    }
    usuarioWebLoginControl.updateValueAndValidity()
    usuarioWebPasswordControl.updateValueAndValidity()
    webEstadoIDControl.updateValueAndValidity()
  }

  formControlValidationsMovilChanged() {
    const usuarioMovilLoginControl = this.registroForm.get('usuarioMovilLogin')
    const usuarioMovilPasswordControl = this.registroForm.get('usuarioMovilPassword')
    const movilEstadoIDControl = this.registroForm.get('movilEstadoID')
    if(this.registro.usuarioMovil){
      usuarioMovilLoginControl.setValidators([Validators.required])
      usuarioMovilPasswordControl.setValidators([Validators.required])
      movilEstadoIDControl.setValidators([Validators.min(1)])
    } else {
      usuarioMovilLoginControl.clearValidators()
      usuarioMovilPasswordControl.clearValidators()
      movilEstadoIDControl.clearValidators()
    }
    usuarioMovilLoginControl.updateValueAndValidity()
    usuarioMovilPasswordControl.updateValueAndValidity()
    movilEstadoIDControl.updateValueAndValidity()
  }

  checkedUsuarioWeb(event){
    this.registro.usuarioWeb = event.checked
    this.formControlValidationsWebChanged()
  }

  checkedUsuarioMovil(event){
    this.registro.usuarioMovil = event.checked
    this.formControlValidationsMovilChanged()
  }

	getTitle():string {
		if (this.registro.usuarioID > 0) return this.registro.disabled ? `Ver Usuario '${this.registro.usuarioNombreCompleto}'` : `Editar usuario '${this.registro.usuarioNombreCompleto}'`;
		return 'Nuevo usuario';
  }

	isControlInvalid(controlName:string): boolean {
		const control = this.registroForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
  }

  buscarTrabajador() {
    this.hasFormErrors = false;
    const datos = this.registroForm.value
    if(datos.empresaID <= 0) return this.showWarning("Debe seleccionar una EMPRESA");
    if(datos.usuarioTipoID <= 0) return this.showWarning("Debe seleccionar un TIPO DE USUARIO");
    if(datos.usuarioDNI.length >= 8) {
      this.currentTrabajador.trabajadorNombreCompleto = "Buscando...!"
      this.trabajadorService.obtenerRegistro$({empresaID:datos.empresaID, tipo:datos.usuarioTipoID, option:2, codigo:datos.usuarioDNI}).subscribe(
        result => {
          this.currentTrabajador = result.data;
          if(this.currentTrabajador.trabajadorID == 0) this.showWarning("No se encontró ningún trabajador con ese documento.")
          else {
            const controls = this.registroForm.controls;
            controls.usuarioWebLogin.setValue(datos.usuarioDNI)
            controls.usuarioWebPassword.setValue(datos.usuarioDNI)
            controls.usuarioMovilLogin.setValue(datos.usuarioDNI)
            controls.usuarioMovilPassword.setValue(datos.usuarioDNI)
          }
          this.ref.detectChanges();
        },
        error => {
          this.showError(error);
          this.ref.detectChanges();
        }
      )
    }else this.showWarning("Debe ingresar un documento válido.")
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
    registroDatos.usuarioID = this.registro.usuarioID;
    registroDatos.usuarioWebID = this.registro.usuarioWebID;
    registroDatos.usuarioMovilID = this.registro.usuarioMovilID;
    registroDatos.usuarioIDReferencia = this.currentTrabajador.trabajadorID;

    if(this.currentTrabajador.trabajadorID == 0) return this.showWarning("Debe asignar un trabajador")
    if(this.selection.selected.length == 0) return this.showWarning("Debe selecionar al menos un empresa en el CONTEXTO")
    if(!registroDatos.usuarioWeb && !registroDatos.usuarioMovil) return this.showWarning("Debe marcar si es un usuario Web y/o Móvil")
    if(registroDatos.usuarioWeb && this.listadoResultPW.length == 0) return this.showWarning("Debe agregar uno o mas Perfiles Web.")
    if(registroDatos.usuarioMovil && this.listadoResultPM.length == 0) return this.showWarning("Debe agregar uno o mas Perfiles Moviles.")
    //if(registroDatos.usuarioMovil && this.listadoResultConfig.length == 0) return this.showWarning("Debe agregar uno o mas Configuraciones al usuario movil.")

    //if(registroDatos.usuarioMovil && registroDatos.movilBacoID.length == 0) return this.showWarning("Debe seleccionar uno o mas tipo de bandeja")
    //if(registroDatos.usuarioMovil && registroDatos.movilCAEID.length == 0) return this.showWarning("Debe seleccionar uno o mas CAEs")
    //if(registroDatos.usuarioMovil && registroDatos.movilAcopioComedorID.length == 0) return this.showWarning("Debe seleccionar uno o mas Acopios")

    if(registroDatos.usuarioStatus == null) registroDatos.usuarioStatus = false;
    if(registroDatos.usuarioWebStatus == null) registroDatos.usuarioWebStatus = false;
    if(registroDatos.usuarioMovilStatus == null) registroDatos.usuarioMovilStatus = false;

    //if(registroDatos.usuarioWeb) registroDatos.usuarioWebPassword = this.encrypt_decrypt(registroDatos.usuarioWebPassword, "e");
    //if(registroDatos.usuarioMovil) registroDatos.usuarioMovilPassword = this.encrypt_decrypt(registroDatos.usuarioMovilPassword, "e");

    registroDatos.usuarioEmpresas = [];
    this.selection.selected.forEach(empresa => {
      registroDatos.usuarioEmpresas.push(empresa)
    })
    registroDatos.detallePerfilesWeb = this.listadoResultPW;
    registroDatos.detallePerfilesMovil = this.listadoResultPM;
    registroDatos.detalleConfiguraciones = this.listadoResultConfig;
    registroDatos.login=this.currentUsuario.usuarioWebLogin;

    this.viewLoading=true;
    // console.log(registroDatos);
    if (registroDatos.usuarioID == 0){
      registroDatos.usuarioWPass = "";
      registroDatos.usuarioMPass = "";

      this.usuarioService.insertarRegistro$(registroDatos).subscribe(
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
      registroDatos.usuarioWPass = this.registro.usuarioWebPassword;
      registroDatos.usuarioMPass = this.registro.usuarioMovilPassword;
      this.usuarioService.actualizarRegistro$(registroDatos).subscribe(
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
      this.router.navigate(['/seguridad/usuario']);
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

	/**
	 * Check all rows are selected
	 */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.listadoResult.length;
		return numSelected === numRows;
  }

	/**
	 * Selects all rows if they are not all selected; otherwise clear selection
	 */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.listadoResult.forEach(row => this.selection.select(row));
		}
  }

  selectedIndexChange(tabIndex:number) {
    // console.log(index)
    if(tabIndex == 1) {
      this.listarCombos(11)
    } else if(tabIndex == 2) {
      this.listarCombos(12)
    }
  }

  agregarPerfilWeb() {
    const datos = this.registroForm.value;
    if(datos.webPerfilID > 0) {
      let perfilSelected = this.listadoCboPerfilesWeb.filter(f=>f.perfilID == datos.webPerfilID)[0]
      let existePerfil = this.listadoResultPW.filter(f=>f.perfilID == perfilSelected.perfilID)
      if(existePerfil.length == 0) {
        this.listadoResultPW.push(perfilSelected)
        this.dataSourcePW = new MatTableDataSource(this.listadoResultPW)
      } else this.showWarning("Perfil ya existe en la lista")
    } else this.showWarning("Debe seleccionar un perfil web")
  }

  eliminarPerfilWeb(item:PerfilModel) {
    let index = this.listadoResultPW.findIndex(f=>f.perfilID == item.perfilID);
    this.listadoResultPW.splice(index,1)
    this.dataSourcePW = new MatTableDataSource(this.listadoResultPW)
  }

  agregarPerfilMovil() {
    const datos = this.registroForm.value;
    if(datos.movilPerfilID > 0) {
      let perfilSelected = this.listadoCboPerfilesMovil.filter(f=>f.perfilID == datos.movilPerfilID)[0]
      let existePerfil = this.listadoResultPM.filter(f=>f.perfilID == perfilSelected.perfilID)
      if(existePerfil.length == 0) {
        this.listadoResultPM.push(perfilSelected)
        this.dataSourcePM = new MatTableDataSource(this.listadoResultPM)
      } else this.showWarning("Perfil ya existe en la lista")
    } else this.showWarning("Debe seleccionar un perfil móvil")
  }

  eliminarPerfilMovil(item:PerfilModel) {
    let index = this.listadoResultPM.findIndex(f=>f.perfilID == item.perfilID);
    this.listadoResultPM.splice(index,1)
    this.dataSourcePM = new MatTableDataSource(this.listadoResultPM)
  }

  agregarConfiguracion() {
    const datos = this.registroForm.value;
    // console.log(datos)
    if(datos.configuracionID > 0) {
      let configSelected = this.listadoCboConfiguracion.filter(f=>f.configID == datos.configuracionID)[0]
      let existeConfig = this.listadoResultConfig.filter(f=>f.configID == configSelected.configID)
      if(existeConfig.length == 0) {
        this.listadoResultConfig.push(configSelected)
        this.dataSourceConfig = new MatTableDataSource(this.listadoResultConfig)
      } else this.showWarning("Configuración ya existe en la lista")
    } else this.showWarning("Debe seleccionar una configuración")
  }

  eliminarConfiguracion(item:any) {
    let index = this.listadoResultConfig.findIndex(f=>f.configID == item.configID);
    this.listadoResultConfig.splice(index,1)
    this.dataSourceConfig = new MatTableDataSource(this.listadoResultConfig)
  }

  // encrypt_decrypt(password:string, tipo:string):string {
  //   if(tipo == "e") return CryptoJS.AES.encrypt(password, KEY_PASSWORD).toString()
  //   else return CryptoJS.AES.decrypt(password, KEY_PASSWORD).toString(CryptoJS.enc.Utf8)
  // }

}
