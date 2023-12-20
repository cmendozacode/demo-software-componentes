// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'kt-show-notification-dialog',
	templateUrl: './show-notification-dialog.component.html'
})
export class ShowNotificationDialogComponent implements OnInit {
	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<ShowNotificationDialogComponent>
	 * @param data: any
	 */
	constructor(
		public dialogRef: MatDialogRef<ShowNotificationDialogComponent>,
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

	// /**
	//  * Close dialog with false result
	//  */
	// onNoClick(): void {
	// 	this.dialogRef.close();
	// }

	// /**
	//  * Close dialog with true result
	//  */
	onYesClick(): void {
		this.dialogRef.close(true); // Keep only this row
	}
}
