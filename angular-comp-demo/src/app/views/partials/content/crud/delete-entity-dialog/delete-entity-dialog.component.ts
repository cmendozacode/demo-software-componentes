// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteService } from '../../../../../core/_services/common/delete.service';
import { TYPE_DELETE_ACTION } from '../../../../../core/_constantes/constantes';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-delete-entity-dialog',
	templateUrl: './delete-entity-dialog.component.html'
})
export class DeleteEntityDialogComponent implements OnInit {
	// Public properties
	viewLoading = false;
	button_delete = "ELIMINAR";
	button_cancel = "CANCELAR";

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
	 * @param data: any
	 */
	constructor(
		public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,private deleteService: DeleteService,
		private translate: TranslateService
	) { 
		this.button_delete = this.translate.instant("BUTTONS.DELETE");
		this.button_cancel = this.translate.instant("BUTTONS.CANCEL");
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
	}

	/**
	 * Close dialog with false result
	 */
	onNoClick(): void {
		this.dialogRef.close();
	}

	/**
	 * Close dialog with true result
	 */
	onYesClick(): void {
		if(this.data.data && this.data.actionModal){
			this.viewLoading = true;
			switch(this.data.actionModal) { 
				case TYPE_DELETE_ACTION.PLANILLA: { 
					this.deleteService.deletePlanilla$(this.data.data).subscribe(result=>{
						this.dialogRef.close({result, isDeleted: true });
					},error=>{
						this.dialogRef.close({error, isDeleted: false });
					});
				   break; 
				} 
				case TYPE_DELETE_ACTION.DETALLE_PLANILLA: { 
					this.deleteService.deleteDetallePlanilla$(this.data.data).subscribe(result=>{
						this.dialogRef.close({result, isDeleted: true });
					},error=>{
						this.dialogRef.close({error, isDeleted: false });
					});
				   break; 
				} 
				default: { 
					setTimeout(() => {
						this.dialogRef.close({isDeleted: true }); // Keep only this row
					}, 1500);
				   break; 
				} 
			 } 
		}else{
			this.dialogRef.close(true); // Keep only this row
		}
	}
}
