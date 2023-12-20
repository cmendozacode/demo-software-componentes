import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-question-comment-dialog',
  templateUrl: './question-comment-dialog.component.html'
})
export class QuestionCommentDialogComponent implements OnInit {

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<QuestionCommentDialogComponent>
	 * @param data: any
	 */

  commentForm: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<QuestionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
  ){}

  ngOnInit() 
  {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      observacion: ['', Validators.required],
    });
  }

  onNoClick(): void 
  {
		this.dialogRef.close();
	}

  onYesClick(): void 
  {
    let params = this.commentForm.controls;

    let result = {
      result: true,
      observacion: params.observacion.value
    }

		this.dialogRef.close(result); // Keep only this row
	}

}
