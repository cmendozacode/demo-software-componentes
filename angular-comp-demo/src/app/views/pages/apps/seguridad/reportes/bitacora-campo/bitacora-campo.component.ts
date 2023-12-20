import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FirestoreSeguridadService } from '../../../../../../core/_services/firestore/firestore-seguridad.service';
import { AngularFireAuth } from '@angular/fire/auth';
import moment from 'moment';

@Component({
  selector: 'kt-bitacora-campo',
  templateUrl: './bitacora-campo.component.html',
  styleUrls: ['./bitacora-campo.component.scss']
})
export class BitacoraCampoComponent implements OnInit {

  dataSource:MatTableDataSource<any>;
  displayedColumns = ['fecha','usuario','nombreusuario','grupo','actividad','legajo','horaequipo','horareal'];
  pageSizeOptions:any[] = [20,30,50];
  registrosResult: any[] = [];

  viewLoading:boolean;
  reporteSinResultados:boolean=true;
  reportePrimeraCarga:boolean=true;
  reporteEjecutado:boolean=false;
  reporteError:boolean=false;
  reporteErrorText="";
  filtroReporte="";

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sortRep', {static: true}) sort: MatSort;
  
  filterForm:FormGroup;
  maxDate = new Date();
  
  constructor(private formBuilder:FormBuilder,private ref: ChangeDetectorRef,
    private firestorSeguridadService:FirestoreSeguridadService,public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.createFilterForm();
  }

	createFilterForm() {
		this.filterForm = this.formBuilder.group({
      fechaIniControl:new FormControl(moment(), Validators.required),
      fechaFinControl:new FormControl(moment(), Validators.required)
    });
  }

  filterBusqueda(formulario:FormGroup): any {
		const filter: any = {};
    filter.fechaIni =  +moment(formulario.value.fechaIniControl).format("YYYYMMDD");
    filter.fechaFin = +moment(formulario.value.fechaFinControl).format("YYYYMMDD");
		return filter;
  }
  
  filterResultados(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  consultarReporte() {
    if(!this.filterForm.invalid){
      
      this.reportePrimeraCarga=false;
      this.viewLoading = true;
      this.reporteError=false;
      this.reporteEjecutado=false;
      this.reporteSinResultados=true;
      this.reporteErrorText="";
      this.filtroReporte="";

      this.afAuth.authState.subscribe(user=>{
        this.firestorSeguridadService.getBitacoraCambioHoras("incidencia_horas_tareocampo",this.filterBusqueda(this.filterForm)).subscribe(
          result => {
            this.reporteSinResultados=(result.length)<=0;
            if(this.reporteSinResultados){
              this.reporteErrorText="No se encontró resultados para los filtros indicados, modifíquelos luego vuelva a intentar."
            }else{
              this.registrosResult=result;
              this.dataSource = new MatTableDataSource(this.registrosResult); 
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            this.reporteEjecutado=true;
            this.viewLoading = false;
            this.ref.detectChanges();
          },(error)=>{
            console.log(error);
            this.reporteEjecutado=true;
            this.reporteError=true;
            this.reporteErrorText=error.error?error.error.message:error.message;
            this.viewLoading = false;
            this.ref.detectChanges(); 
          }
        );
      },err=>{
        console.log(err);
        this.reporteEjecutado=true;
        this.reporteError=true;
        this.reporteErrorText="Error de autenticación en base de datos, favor de cerrar sesión y volver a generar el reporte";
        this.viewLoading = false;
        this.ref.detectChanges(); 
      });
    }
  }

  getButtonConsultaDisabled():boolean{
		return this.viewLoading || this.filterForm.invalid;
	}

  getTituloReporte():string {
    return "Bitácora de manipulación de horas - Tareo Campo";
  }

  getTituloResultados():string {
    if(this.viewLoading){
      return "Consultando...";
    }else{
      return "Resultados del Informe";
    } 
  }

  getFechaFormat(fecha:string):string{
    return moment(fecha,"YYYYMMDD").format("DD/MM/YYYY");
  }

}
