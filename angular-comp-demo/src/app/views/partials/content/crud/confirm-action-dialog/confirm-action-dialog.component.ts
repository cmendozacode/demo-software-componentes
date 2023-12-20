// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'kt-confirm-action-dialog',
	templateUrl: './confirm-action-dialog.component.html'
})
export class ConfirmActionDialogComponent implements OnInit {
	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<ConfirmActionDialogComponent>
	 * @param data: any
	 */
	constructor(
		public dialogRef: MatDialogRef<ConfirmActionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

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
		this.dialogRef.close(true); // Keep only this row
	}
}
