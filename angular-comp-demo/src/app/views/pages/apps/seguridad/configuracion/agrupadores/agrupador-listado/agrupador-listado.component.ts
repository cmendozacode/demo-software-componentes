// Angular
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// Translate Module
import { TranslateService } from '@ngx-translate/core';

import { AgrupadorService, PerfilService } from '../../../../../../../core/_services';
import { AgrupadorModel, EmpresaCultivoModel } from '../../../../../../../core/_models';
import { LayoutUtilsService } from '../../../../../../../core/_base/crud';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User, currentUser, currentCultivo } from '../../../../../../../core/auth';
import { AppState } from '../../../../../../../core/reducers';
import { TYPE_ALERT } from '../../../../../../../core/_constantes/constantes';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'kt-agrupador-listado',
  templateUrl: './agrupador-listado.component.html',
  styleUrls: ['./agrupador-listado.component.scss']
})
export class AgrupadorListadoComponent implements OnInit {

  subscriptions: Subscription[] = [];
  dataSource:MatTableDataSource<AgrupadorModel>;
  displayedColumns = ["select", "nro", "configuracionNombre", "tipoConfiguracionNombre", "cantidadCodigos", "status", "actions"];
  pageSizeOptions:any[] = [20,30,50];
  loading:boolean;
 
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;

  // Selection
  selection = new SelectionModel<AgrupadorModel>(true, []);
  listadoResult:AgrupadorModel[] = []

  hasFormErrors:boolean;
  typeAlert:String;
  messageAlert:String;
  currentUsuario:User=undefined;
  cultivo:EmpresaCultivoModel=undefined;
  
  constructor(
    public dialog:MatDialog,
    private agrupadorService:AgrupadorService,
    private translate:TranslateService,
    private layoutUtilsService:LayoutUtilsService,
    private router:Router,
    private store: Store<AppState>,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(combineLatest(
			this.store.pipe(select(currentUser)),
			this.store.pipe(select(currentCultivo)))
			.pipe(filter(e => !e.includes(null)),tap(([resUsuario, resCultivo]) => {
				if(resUsuario && resCultivo){
          this.currentUsuario=resUsuario;
          this.cultivo=resCultivo;
          this.cargarListaDatos();
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

  cargarListaDatos() {
    this.loading = true;
    this.agrupadorService.listarRegistros$(this.cultivo.cultivoID).subscribe(
      result => {
        this.listadoResult = result.data;
        this.dataSource = new MatTableDataSource(this.listadoResult)
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.showError(error)
        this.ref.detectChanges();
      }
    );
    this.selection = new SelectionModel<AgrupadorModel>(true, []);
  }

  editarRegistro(registro:AgrupadorModel) {
    this.router.navigate(['seguridad/agrupadores-reg'], {state: { param:registro}});
  }

  eliminarRegistro(registro:AgrupadorModel) {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.AGRUPADOR.TITLE"),
      this.translate.instant("QUESTION_DELETE.ONE"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;

      registro.userName=this.currentUsuario.usuarioWebLogin;
      this.agrupadorService.eliminarRegistro$(registro).subscribe(
        result => {
          this.layoutUtilsService.showActionNotification(result.message, null);
          this.cargarListaDatos();
        }
      );
    });
  }

  eliminarRegistrosSeleccionados() {
    const dialogRef = this.layoutUtilsService.deleteElement(
      this.translate.instant("SEGURIDAD.AGRUPADOR.TITLE"),
      this.translate.instant("QUESTION_DELETE.MANY"),
      this.translate.instant("MESSAGE.WAIT")
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      const datos:any = {};
      datos.codigos = [];
      datos.login=this.currentUsuario.usuarioWebLogin;
      for (let i = 0; i < this.selection.selected.length; i++) {
				datos.codigos.push(this.selection.selected[i].configuracionId);
			}
      this.agrupadorService.eliminarRegistroMasivo$(datos).subscribe(
        result => {
          this.layoutUtilsService.showActionNotification(result.message, null);
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
