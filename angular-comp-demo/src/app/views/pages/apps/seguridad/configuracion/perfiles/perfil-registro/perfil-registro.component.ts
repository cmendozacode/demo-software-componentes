import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilModel, AccesoModel } from '../../../../../../../core/_models/';
import { PerfilService, UtilsService } from '../../../../../../../core/_services'
import { LayoutUtilsService, MessageType } from '../../../../../../../core/_base/crud';
import { TYPE_ALERT, MESSAGE_ALERT_VALIDATIONS } from '../../../../../../../core/_constantes/constantes';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User, currentUser } from '../../../../../../../core/auth';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AppState } from '../../../../../../../core/reducers';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

interface Node {
  name: string;
  children?: Node[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'kt-perfil-registro',
  templateUrl: './perfil-registro.component.html',
  styleUrls: ['./perfil-registro.component.scss'],
})
export class PerfilRegistroComponent implements OnInit {

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  items:TreeviewItem[];
  values:number[];
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: false,
      hasCollapseExpand: false,
      decoupleChildFromParent: false,
      maxHeight: 5000
  });

  registro:PerfilModel;
  registroForm:FormGroup;

  hasFormErrors:boolean;
  viewLoading:boolean;

  listadoAccesosWebMovil:AccesoModel[] = []
  listadoAccesos:AccesoModel[] = []
  subscriptions: Subscription[] = [];

  currentUsuario:User=undefined;
  typeAlert:String
  messageAlert:String

  constructor(private fb:FormBuilder,private perfilService:PerfilService,private layoutUtilsService:LayoutUtilsService,private ref: ChangeDetectorRef,
    private utilsService:UtilsService,private activatedRoute:ActivatedRoute,private router:Router,private store: Store<AppState>) {}

  ngOnInit() {
    this.registro = new PerfilModel();
    this.registro.clear()
    this.poblarAccesos();
    this.createForm();
    const usuarioSubscription = this.store.pipe(select(currentUser)).subscribe(res =>{
			if(res){
				this.currentUsuario=res;
			}
    });

    this.subscriptions.push(usuarioSubscription);
  }

  ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
  }

  poblarAccesos() {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data => {
      if(data.param) {
        this.registro = data.param;
      }
      this.utilsService.listarCombo$({option:this.registro.perfilID == 0 ? 7 : (this.registro.perfilWebMovil ? 8 : 9), valorID: this.registro.perfilID}).subscribe(
        result => {
          this.listadoAccesosWebMovil = result.data.table;
          if(this.registro.perfilID > 0){
            this.registroForm.controls['perfilWebMovilID'].setValue(this.registro.perfilWebMovil? 1 : 2);
            //this.registroForm.controls['perfilDescripcion'].disable();
            this.registroForm.controls['perfilWebMovilID'].disable();
          } 
        }
      ); 
    })
  }

  createForm() {
    this.registroForm = this.fb.group({
      perfilDescripcion: [this.registro.perfilDescripcion, Validators.required],
      perfilWebMovilID: [this.registro.perfilID == 0 ? 0 : (this.registro.perfilWebMovil ? 1 : 2), Validators.min(1)],
      perfilStatus: [this.registro.perfilStatus ? 1 : 0],
    });

    this.registroForm.controls['perfilWebMovilID'].valueChanges.subscribe((value) => {
      if(value > 0) {
        if(value == 1) this.listadoAccesos = this.listadoAccesosWebMovil.filter(f=>f.accesoWebMovil)
        else this.listadoAccesos = this.listadoAccesosWebMovil.filter(f=>!f.accesoWebMovil)
        this.items = this.getAccesosTreeView()
        this.dataSource.data = this.getAccesosNode();
      }
    });
  }
 
  validations = {
    perfilDescripcion: [ { name: 'required', message: 'Debe ingresar una DESCRIPCIÓN.' }],
    perfilWebMovilID: [ { name: 'min', message: 'Debe seleccionar un TIPO DE PERFIL.' }],
  }

	getTitle():string {
		if (this.registro.perfilID > 0) return this.registro.perfilDisabled ? `Ver perfil '${this.registro.perfilDescripcion}'` : `Editar perfil '${this.registro.perfilDescripcion}'`;
		return 'Nuevo perfil';
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

    if(this.listaValoresSelected.length == 0) return this.showWarning("Debe asignar al menos un Acceso al PERFIL.");

    const registroDatos = this.registroForm.getRawValue();
    registroDatos.perfilID = this.registro.perfilID;
    registroDatos.perfilWebMovil = registroDatos.perfilWebMovilID == 1 ? true : false;
    registroDatos.perfilDetalleAccesos = [];
    registroDatos.login=this.currentUsuario.usuarioWebLogin;
    this.listaValoresSelected.forEach(element => {
      registroDatos.perfilDetalleAccesos.push({accesoID:element});
    });

    this.viewLoading=true;
    if (registroDatos.perfilID == 0){
      this.perfilService.insertarRegistro$(registroDatos).subscribe(
        result => {
          this.viewLoading=false;
          this.resultMessage(result);
          this.ref.detectChanges();
        },
        error => {
          this.viewLoading=false;
          this.layoutUtilsService.showActionNotification(error, MessageType.Create, 4000, true, false);
          this.ref.detectChanges();
        }
      );
    }
    else {
      this.perfilService.actualizarRegistro$(registroDatos).subscribe(
        result => {
          this.viewLoading=false;
          this.resultMessage(result);
          this.ref.detectChanges();
        },
        error => {
          this.viewLoading=false;
          this.layoutUtilsService.showActionNotification(error, MessageType.Create, 4000, true, false);
          this.ref.detectChanges();
        }
      );
    } 

  }

  resultMessage(resultServer:any) {
    if(resultServer.statusCode == 200) {
      // this.dialogRef.close({ serverRegister, isEdit: false}) 
      this.layoutUtilsService.showActionNotification(resultServer.message, null);  
      this.router.navigate(['/seguridad/perfil']);    
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

  //TreeView
  listaValoresSelected:number[]

  onSelectedChange(valores) {    
    this.listaValoresSelected = valores
    /*this.listaValoresSelected.forEach(acceso => {
      let accesoSelected = this.listadoAccesos.filter(f=>f.accesoID == acceso)[0]
      accesoSelected.accesoChecked = true
    })*/
    this.listadoAccesos.forEach(acceso => {
      let checked = this.listaValoresSelected.includes(acceso.accesoID)
      acceso.accesoChecked = checked
    })

    //console.log(this.listadoAccesos.filter(x=>x.accesoChecked))
    
    if(this.listaValoresSelected.length > 0) {
      this.dataSource.data = this.getAccesosNode();
      //console.log(this.dataSource.data);
      this.treeControl.expandAll()
    } 
   }
 
  filterDistinctModulo(arrayList:AccesoModel[]){
    return Array.from(new Set(arrayList.map(a=>a.moduloID)))
    .map(moduloID => {
      return {
        moduloID: moduloID,
        moduloDescripcion: arrayList.find(a=>a.moduloID == moduloID).moduloDescripcion
      }
    });
  }
 
  getAccesosTreeView():TreeviewItem[] {
    let listadoAccesosTreeView:TreeviewItem[] = [];
    let modulos = this.filterDistinctModulo(this.listadoAccesos);
    modulos.forEach(moduloItem => {
      let childsModulo = this.listadoAccesos.filter(f=>f.moduloID == moduloItem.moduloID && f.accesoPadreID == 0)
      if(childsModulo.length > 0) {
        const accesoTreeView = new TreeviewItem({
          text:moduloItem.moduloDescripcion, 
          value:moduloItem.moduloID, 
          collapsed:false, 
          children:this.getAccesosSubModuloTreeView(childsModulo), 
          checked:false, 
          disabled: this.registro.perfilDisabled
        })
        listadoAccesosTreeView.push(accesoTreeView)
      }
    })
    return listadoAccesosTreeView
  }
 
  getAccesosSubModuloTreeView(subModulos:AccesoModel[]):TreeviewItem[] {
    let listaAccesosChildTreeView:TreeviewItem[] = [];
    subModulos.forEach(element => {
      let childs = this.listadoAccesos.filter(f=>f.accesoPadreID == element.accesoID ||
          (f.accesoPadreID==0 && f.moduloID==element.moduloID));
      if(childs.length > 0) {
        const accesoChildTreeView = new TreeviewItem({
          text:element.accesoDescripcion, 
          value:element.accesoID, 
          collapsed:false, 
          children:this.getAccesosChildTreeView(element.accesoID), 
          checked:element.accesoChecked
        })
        listaAccesosChildTreeView.push(accesoChildTreeView)
      }
    })
    return listaAccesosChildTreeView
  }

  getAccesosChildTreeView(accesoID:number):TreeviewItem[] {
    let listadoAccesosItemTreeView:TreeviewItem[] = [];
    let childs = this.listadoAccesos.filter(f=>f.accesoPadreID == accesoID)
    childs.forEach(element => {
      const accesoItemTreeView = new TreeviewItem({
        text:element.accesoDescripcion, 
        value:element.accesoID, 
        collapsed:true, 
        children:this.getAccesosChildTreeView(element.accesoID), 
        checked:element.accesoChecked
      })
      listadoAccesosItemTreeView.push(accesoItemTreeView)
    })
    return listadoAccesosItemTreeView
  }  

  getAccesosNode():Node[] {
    let listadoAccesosNode:Node[] = [];
    let modulos = this.filterDistinctModulo(this.listadoAccesos);
    modulos.forEach(moduloItem => {
      let childsModulo = this.listadoAccesos.filter(f=>f.moduloID == moduloItem.moduloID && f.accesoPadreID == 0)
      if(childsModulo.length > 0) {
        const accesoNode:Node = {
          name:moduloItem.moduloDescripcion, 
          children:this.getAccesosSubModuloNode(childsModulo)
        }
        if(accesoNode.children.length > 0) listadoAccesosNode.push(accesoNode)
      }
    })
    return listadoAccesosNode
  }

  getAccesosSubModuloNode(subModulos:AccesoModel[]):Node[] {
    let listaAccesosChildNode:Node[] = []
    subModulos.forEach(element => {
      let childs = this.listadoAccesos.filter(f=>f.accesoPadreID == element.accesoID || (f.accesoPadreID==0 && f.moduloID==element.moduloID));
      if(childs.length > 0) {
          const accesoChildNode:Node = {
            name:element.accesoDescripcion, 
            children:this.getAccesosChildNode(element.accesoID)
          }
          //console.log(accesoChildNode)
          if(accesoChildNode.children.length > 0 || element.accesoChecked) listaAccesosChildNode.push(accesoChildNode)
        
      }
    })
    return listaAccesosChildNode
  }

  getAccesosChildNode(accesoID:number):Node[] {
    let listadoAccesosItemNode:Node[] = [];
    let childs = this.listadoAccesos.filter(f=>f.accesoPadreID == accesoID)
    childs.forEach(element => {
      const accesoItemNode:Node = {
        name:element.accesoDescripcion,
        children: this.getAccesosChildNode(element.accesoID)
      }
      if(accesoItemNode.children.length > 0 || element.accesoChecked) listadoAccesosItemNode.push(accesoItemNode)
    })
    return listadoAccesosItemNode
  } 

}
