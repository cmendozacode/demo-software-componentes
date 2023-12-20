import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartialsModule } from '../../../partials/partials.module';
import {MatDialogRef, MAT_DIALOG_DATA,MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatTooltipModule, MatDialogModule, MatCheckboxModule, 
  MatIconModule, MatSelectModule, MatTreeModule, MatTabsModule, MatDatepickerModule, 
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PerfilListadoComponent } from './configuracion/perfiles/perfil-listado/perfil-listado.component';
import { PerfilRegistroComponent } from './configuracion/perfiles/perfil-registro/perfil-registro.component';
import { UsuarioRegistroComponent } from './configuracion/usuarios/usuario-registro/usuario-registro.component';
import { UsuarioListadoComponent } from './configuracion/usuarios/usuario-listado/usuario-listado.component';
import { AgrupadorListadoComponent } from './configuracion/agrupadores/agrupador-listado/agrupador-listado.component';
import { AgrupadorRegistroComponent } from './configuracion/agrupadores/agrupador-registro/agrupador-registro.component';
import { CoreModule } from '../../../../../app/core/core.module';
import { BitacoraCampoComponent } from './reportes/bitacora-campo/bitacora-campo.component';
import { BitacoraPackingComponent } from './reportes/bitacora-packing/bitacora-packing.component';
import { MY_FORMATS_DDMMYYY, InterceptService } from '../../../../core/_base/crud';
import { TreeviewModule } from 'ngx-treeview';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxPermissionsGuard } from 'ngx-permissions';


import {LibCustomModule} from '../../lib/libcustom.module';
import {HtmlFormComponent} from '../../lib/lib-components/htmlform-component/htmlform.component';
import {DialogFormSearchInputComponent} from '../../lib/lib-components/htmlform-component/htmlform.component';
import {HtmlTableComponent} from '../../lib/lib-components/htmltable-component/htmltable.component';
import {DialogTableSearchInputComponent} from '../../lib/lib-components/htmltable-component/htmltable.component';

import { SecurityService } from '../seguridad/services/security.service'

import { UserComponent } from './mantenimiento/user/user.component';
import { UserGroupComponent } from './mantenimiento/usergroup/usergroup.component';
import { LegalcompanyComponent } from './mantenimiento/legalcompany/legalcompany.component';
import { RoleComponent } from './mantenimiento/role/role.component';

const routes:Routes = [
  {
    path: 'agrupadores',
    component: AgrupadorListadoComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['accessToSeguridadModuleConfAgrupadores'],
        redirectTo: '/home'
      }
    }
  },
  {
    path: 'agrupadores-reg',
    component: AgrupadorRegistroComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['accessToSeguridadModuleConfAgrupadores'],
        redirectTo: '/home'
      }
    }
  },
  {
    path: 'perfil',
    component: PerfilListadoComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleConfPerfiles'],
        redirectTo: '/home'
      }
		}
  },
  {
    path: 'perfil-reg',
    component: PerfilRegistroComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleConfPerfiles'],
        redirectTo: '/home'
      }
		}
  },  
  {
    path: 'usuario',
    component: UsuarioListadoComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleConfUsuarios'],
        redirectTo: '/home'
      }
		}
  },
  {
    path: 'usuario-reg',
    component: UsuarioRegistroComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleConfUsuarios'],
        redirectTo: '/home'
      }
		}
  },
  {
    path: 'tcampo-bitacora',
    component: BitacoraCampoComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleReportesBitacoraCampo'],
        redirectTo: '/home'
      }
		}
  },
  { 
    path: 'tpacking-bitacora',
    component: BitacoraPackingComponent,
    canActivate: [NgxPermissionsGuard],
		data: {
      permissions: {
        only: ['accessToSeguridadModuleReportesBitacoraPacking'],
        redirectTo: '/home'
      }
		}
  }
  ,   
  {
    path: 'mnt-usuario',
    component: UserComponent, 
  }
  ,
  {
    path: 'mnt-usergroup',
    component: UserGroupComponent, 
  }
  ,
  {
    path: 'mnt-legalcompany',
    component: LegalcompanyComponent, 
  }
  ,
  {
    path: 'mnt-role',
    component: RoleComponent, 
  },


]

@NgModule({
  declarations: [
    PerfilListadoComponent, PerfilRegistroComponent, 
    UsuarioRegistroComponent, UsuarioListadoComponent, 
    BitacoraCampoComponent, BitacoraPackingComponent,
    AgrupadorListadoComponent, AgrupadorRegistroComponent,

  

    UserComponent,
    UserGroupComponent,
    LegalcompanyComponent,
    RoleComponent
  ],
  entryComponents: [],//DialogFormSearchInputComponent,DialogTableSearchInputComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    MatTreeModule,
    RouterModule.forChild(routes),
    TreeviewModule.forRoot(),
    MatTabsModule,
    CoreModule,
    LibCustomModule
    //DialogFormSearchInputComponent,
		//DialogTableSearchInputComponent,
		//HtmlFormComponent,
		//HtmlTableComponent,
  ],
  exports: [],//DialogFormSearchInputComponent,DialogTableSearchInputComponent],
  providers: [
    {
			provide:MatDialogRef,
			useValue:{}
		},    
		{ provide:MAT_DIALOG_DATA,
		   useValue:{}
	    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { }}, 
    InterceptService,
    {provide: HTTP_INTERCEPTORS,useClass: InterceptService,multi: true},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DDMMYYY},
  
  ]
})
export class SeguridadModule {


 }
