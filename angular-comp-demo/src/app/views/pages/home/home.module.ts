import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../../core/core.module";
import { PartialsModule } from "../../partials/partials.module";
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { ReportesCosechaModule } from "../apps/cosecha/reportes/reportes.cosecha.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
};

@NgModule({
	imports: [
		ReportesCosechaModule,
		CommonModule,
		PartialsModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: "", component: HomeComponent }]),
		PerfectScrollbarModule,
		NgbDropdownModule,
		NgxPermissionsModule.forChild(),
	],
	providers: [
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
		},
	],
	declarations: [HomeComponent],
	exports: [],
})
export class HomeModule {}
