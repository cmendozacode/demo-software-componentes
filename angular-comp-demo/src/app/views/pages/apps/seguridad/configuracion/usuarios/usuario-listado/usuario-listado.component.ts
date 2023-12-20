// Angular
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// Translate Module
import { TranslateService } from '@ngx-translate/core';

import { UsuarioService } from '../../../../../../../core/_services';
import { UsuarioModel, EmpresaModel } from '../../../../../../../core/_models';
import { LayoutUtilsService } from '../../../../../../../core/_base/crud';
import { Router } from '@angular/router';
import { TYPE_ALERT } from '../../../../../../../core/_constantes/constantes';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { currentEmpresa, User, currentUser } from '../../../../../../../core/auth';
import { AppState } from '../../../../../../../core/reducers';

@Component({
  selector: 'kt-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.scss']
})
export class UsuarioListadoComponent implements OnInit {

  dataSource:MatTableDataSource<UsuarioModel>;
  displayedColumns = ["select", "nro", "empresaNombre", "usuarioTipoNombre", "usuarioCodigo", "usuarioNombreCompleto", "usuarioCorreo", "usuarioWeb", "usuarioMovil", "usuarioStatus", "actions"];
  pageSizeOptions:any[] = [10,15,20];
  loading:boolean;
 
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;
  filtroUsuarios="";

  // Selection
  selection = new SelectionModel<UsuarioModel>(true, []);
  listadoResult:UsuarioModel[] = []

  hasFormErrors:boolean;
  typeAlert:String
  messageAlert:String

  empresa$:Observable<EmpresaModel>=this.store.pipe(select(currentEmpresa));
  subscriptions:Subscription[] = [];
  currentEmpresa:EmpresaModel=undefined;
  currentUsuario:User=undefined;

  constructor(
    private store: Store<AppState>,
    public dialog:MatDialog,
    private usuarioService:UsuarioService,
    private translate:TranslateService,
    private layoutUtilsService:LayoutUtilsService,
    private router:Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.pipe(select(currentUser)).subscribe(user=>this.currentUsuario=user);
    this.cargarListaDatos();
  }

  ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  cargarListaDatos() {
    this.loading = true;
    this.filtroUsuarios="";
    this.subscriptions.push(this.empresa$.subscribe(res => {
      if(res){
        this.usuarioService.listarRegistros$({empresaID:res.empresaID}).subscribe(
          result => {
            this.listadoResult = result.data;
            this.dataSource = new MatTableDataSource(this.listadoResult)
            this.loading = false;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.ref.detectChanges();
          },
          error => this.showError(error)
        );
        this.selection = new SelectionModel<UsuarioModel>(true, []);        
      }
    }))
  }
  
  editarRegistro(registro:UsuarioModel, disabled:boolean) {
    if(disabled) registro.disabled = disabled
    registro.usuarioLegajo = registro.usuarioCodigo
    this.router.navigate(['seguridad/usuario-reg'], {state: { param:registro}});
  }

  eliminarRegistro(registro:UsuarioModel) {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.USUARIO.TITLE"),
      this.translate.instant("QUESTION_DELETE.ONE"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      
      registro.login=this.currentUsuario.usuarioWebLogin;
      this.usuarioService.eliminarRegistro$(registro).subscribe(
        result => {
          this.layoutUtilsService.showActionNotification(result.message, null,3000,true,false);
          this.cargarListaDatos();
        }
      );
    });
  }

  eliminarRegistrosSeleccionados() {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.USUARIO.TITLE"),
      this.translate.instant("QUESTION_DELETE.MANY"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      const datos:any = {};
      datos.codigos = [];
      datos.login=this.currentUsuario.usuarioWebLogin;
      this.selection.selected.forEach(dato=> datos.codigos.push(dato.usuarioID));
      this.usuarioService.eliminarRegistroMasivo$(datos).subscribe(
        result => {
          this.selection.clear();
          this.layoutUtilsService.showActionNotification(result.message, null,3000,true,false);
          this.cargarListaDatos();
        }
      );
    });
  }

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.listadoResult.length;
		return numSelected === numRows;
  }
  
  masterToggle() {
    if (this.isAllSelectedRegistros() || this.selection.selected.length>0) {
      this.selection.clear();
    } else {
      if(this.dataSource.filteredData.length>0){
        this.selection.clear();
        this.listadoResult.forEach(row => {
          if(this.dataSource.filteredData.filter(x=>x.usuarioID==row.usuarioID).length>0){
            this.selection.select(row)
          }
        });
      }else{
        this.listadoResult.forEach(row => this.selection.select(row));
      }
    }
  }

  isAllSelectedRegistros() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listadoResult.length;
    return numSelected === numRows;
  }

  isAllFilterSelectedRegistros() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  showError(e) {
    this.loading = false;
    if(e.error) e = e.error;
    this.hasFormErrors = true;
    this.typeAlert = TYPE_ALERT.DANGER
    this.messageAlert = e.message
  }

  onAlertClose(){
    this.hasFormErrors = false
  }

}
