// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-question-entity-dialog',
	templateUrl: './question-entity-dialog.component.html'
})
export class QuestionEntityDialogComponent implements OnInit {
	// Public properties
	viewLoading = false;
	button_accept = "ACEPTAR";
	button_cancel = "CANCELAR";
	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<QuestionEntityDialogComponent>
	 * @param data: any
	 */
	constructor(
		public dialogRef: MatDialogRef<QuestionEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService
	) { 
		this.button_accept = this.translate.instant("BUTTONS.ACCEPT");
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
		/* Server loading imitation. Remove this */
		this.viewLoading = true;
		setTimeout(() => {
			this.dialogRef.close(true); // Keep only this row
		}, 1000);
	}
}
