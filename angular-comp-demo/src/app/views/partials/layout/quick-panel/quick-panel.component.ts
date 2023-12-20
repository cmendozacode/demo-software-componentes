// Angular
import { Component, OnInit } from '@angular/core';
// Layout
import { OffcanvasOptions } from '../../../../core/_base/layout';
import { EmpresaCultivoModel } from '../../../../core/_models';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { CultivoEmpresa, currentEmpresa, currentCultivo } from '../../../../core/auth';

@Component({
	selector: 'kt-quick-panel',
	templateUrl: './quick-panel.component.html',
	styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent implements OnInit  {
	// Public properties
	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-quick-panel',
		closeBy: 'kt_quick_panel_close_btn',
		toggleBy: 'kt_quick_panel_toggler_btn'
	};

	subscriptions: Subscription[] = [];
	cultivos: EmpresaCultivoModel[]=[];
	cultivo$: Observable<EmpresaCultivoModel>;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		const empresaSubscription=this.store.pipe(select(currentEmpresa)).subscribe(res =>{
			if(res){
				this.cultivos=res.empresaCultivos;
				this.cultivo$=this.store.pipe(select(currentCultivo));
			}
		});
		this.subscriptions.push(empresaSubscription);
	}

	selectCultivo(cultivo:EmpresaCultivoModel) {
		this.store.dispatch(new CultivoEmpresa({cultivoEmpresa: cultivo}));
	}

	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}
}
