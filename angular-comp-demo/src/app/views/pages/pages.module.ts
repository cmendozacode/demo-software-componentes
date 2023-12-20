// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent,
	QuestionEntityDialogComponent,
	ShowNotificationDialogComponent
} from '../partials/content/crud';
// Core => Utils
import {
	TypesUtilsService,
	LayoutUtilsService
} from '../../core/_base/crud';
// Material
import {MatDialogModule , MatDialogRef,MAT_DIALOG_DATA,
	MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material';
// Pages
import { CoreModule } from '../../core/core.module';
import { MaestrosCosechaModule } from './apps/cosecha/maestros/maestros.cosecha.module';
import { MaestrosManoobraModule } from './apps/manoobra/maestros/maestros.manoobra.module';
import { ProcesosManoobraModule } from './apps/manoobra/procesos/procesos.manoobra.module';
import { ProcesosCosechaModule } from './apps/cosecha/procesos/procesos.cosecha.module';
import { ReportesManoobraModule } from './apps/manoobra/reportes/reportes.manoobra.module';
import { SeguridadModule } from './apps/seguridad/seguridad.module';
import { ReportesCosechaModule } from './apps/cosecha/reportes/reportes.cosecha.module';
import { ControlSmartDataModule } from './apps/smartdata/control/control.smartdata.module';
import { ReportesAgrilyticsModule } from './apps/agrilytics/reportes/reportes.agrilytics.module';




import {HtmlFormComponent} from './lib/lib-components/htmlform-component/htmlform.component';
import {DialogFormSearchInputComponent} from './lib/lib-components/htmlform-component/htmlform.component';
import {HtmlTableComponent} from './lib/lib-components/htmltable-component/htmltable.component';


@NgModule({
	declarations: [ 
	],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MaestrosCosechaModule,
		MaestrosManoobraModule,
		ProcesosManoobraModule,
		ReportesManoobraModule,
		ProcesosCosechaModule,
		SeguridadModule,
		ReportesCosechaModule,
		ControlSmartDataModule,
		ReportesAgrilyticsModule
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		QuestionEntityDialogComponent,
		ShowNotificationDialogComponent
	],
	providers: [
		{
			provide:MatDialogRef,
			useValue:{}
		},    
		{ provide:MAT_DIALOG_DATA,
		   useValue:{}
	    },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		TypesUtilsService,
		LayoutUtilsService
	]
})
export class PagesModule {}
