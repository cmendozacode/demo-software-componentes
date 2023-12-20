// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// Translate Module
import { TranslateService } from '@ngx-translate/core';

import { PerfilService } from '../../../../../../../core/_services';
import { PerfilRegistroComponent } from '../perfil-registro/perfil-registro.component';
import { PerfilModel } from '../../../../../../../core/_models';
import { LayoutUtilsService } from '../../../../../../../core/_base/crud';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User, currentUser } from '../../../../../../../core/auth';
import { AppState } from '../../../../../../../core/reducers';
import { TYPE_ALERT } from '../../../../../../../core/_constantes/constantes';

@Component({
  selector: 'kt-perfil-listado',
  templateUrl: './perfil-listado.component.html',
  styleUrls: ['./perfil-listado.component.scss']
})
export class PerfilListadoComponent implements OnInit {

  dataSource:MatTableDataSource<PerfilModel>;
  displayedColumns = ["select", "nro", "perfilDescripcion", "perfilWeb", "perfilMovil", "perfilStatus", "actions"];
  pageSizeOptions:any[] = [10,15,20];
  loading:boolean;
 
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;

  // Selection
  selection = new SelectionModel<PerfilModel>(true, []);
  listadoResult:PerfilModel[] = []

  hasFormErrors:boolean;
  typeAlert:String;
  messageAlert:String;
  currentUsuario:User=undefined;

  constructor(
    public dialog:MatDialog,
    private perfilService:PerfilService,
    private translate:TranslateService,
    private layoutUtilsService:LayoutUtilsService,
    private router:Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.pipe(select(currentUser)).subscribe(user=>this.currentUsuario=user);
    this.cargarListaDatos();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  cargarListaDatos() {
    this.loading = true;
    this.perfilService.listarRegistros$({}).subscribe(
      result => {
        this.listadoResult = result.data;
        this.dataSource = new MatTableDataSource(this.listadoResult)
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.showError(error)
    );
    this.selection = new SelectionModel<PerfilModel>(true, []);
  }

  nuevoRegistro() {
    const nuevoRegistro = new PerfilModel();
    nuevoRegistro.clear();
    this.mostrarModal(nuevoRegistro)
  }

  mostrarModal(registro:PerfilModel) {
    const dialogRef = this.dialog.open(PerfilRegistroComponent, { data: { registro } });
    dialogRef.afterClosed().subscribe(res => {
      if(!res) return;
      this.cargarListaDatos();
    })
  }

  editarRegistro(registro:PerfilModel, disabled:boolean) {
    if(disabled) registro.perfilDisabled = disabled
    this.router.navigate(['seguridad/perfil-reg'], {state: { param:registro}});
  }

  eliminarRegistro(registro:PerfilModel) {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.PERFIL.TITLE"),
      this.translate.instant("QUESTION_DELETE.ONE"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;

      registro.login=this.currentUsuario.usuarioWebLogin;
      this.perfilService.eliminarRegistro$(registro).subscribe(
        result => {
          this.layoutUtilsService.showActionNotification(result.message, null);
          this.cargarListaDatos();
        }
      );
    });
  }

  eliminarRegistrosSeleccionados() {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.PERFIL.TITLE"),
      this.translate.instant("QUESTION_DELETE.MANY"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      const datos:any = {};
      datos.codigos = [];
      datos.login=this.currentUsuario.usuarioWebLogin;
      for (let i = 0; i < this.selection.selected.length; i++) {
				datos.codigos.push(this.selection.selected[i].perfilID);
			}
      this.perfilService.eliminarRegistroMasivo$(datos).subscribe(
        result => {
          this.layoutUtilsService.showActionNotification(result.message, null);
          this.cargarListaDatos();
        }
      );
    });
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
