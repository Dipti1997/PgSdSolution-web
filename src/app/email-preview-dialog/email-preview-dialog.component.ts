import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-preview-dialog',
  templateUrl: './email-preview-dialog.component.html',
  styleUrls: ['./email-preview-dialog.component.css']
})
export class EmailPreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { body: string }
  ) {}
  
  onClose(): void {
    this.dialogRef.close();
  }
}
