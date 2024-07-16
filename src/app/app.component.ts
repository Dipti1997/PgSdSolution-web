import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './app.service';
import { NotificationService } from './notification.service';
import { EmailPreviewDialogComponent } from './email-preview-dialog/email-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  emailForm: FormGroup;
  dataForm: FormGroup;
  emailPlaceholder: string = 'Test Email';
  emailLabel: string = 'Test Email';
  mailThrouth: string = 'alibaba';
  selectedFile: File | null = null;
  fileSelected = false;
  dataFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    this.emailForm = this.fb.group({
      fromEmail: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      fromName: ['', Validators.required],
      testEmail: ['', [Validators.email]],
      bulkEmail: [''],
      emailType: ['plain', Validators.required],
      body: ['', Validators.required],
      limit: [3000],
      offer: [''],
      domain: [''],
      dataFile: [''],
      accessId: ['', Validators.required],
      accessKey: ['', Validators.required],
      limitToSend: [30],
      sleepyTime: [0],
      zone: ['SINGAPORE'],
      emailThrough: ['', Validators.required],
    });

    this.dataForm = this.fb.group({
      csvFile: [null],
      blobUrls: [''],
      separationCount: ['', Validators.required],
      tempFile: ['', Validators.required],
      tempFileName: [''],
    });
  }
  ngOnInit(): void {
    this.emailForm.get('emailType')?.valueChanges.subscribe((value) => {
      this.updateEmailField(value);
    });
    this.emailForm.get('emailThrough')?.valueChanges.subscribe((value) => {
      this.mailThrouth = value;
    });
  }

  send() {
    if (this.emailForm.valid) {
      const formValue = this.emailForm.value;
      // if(this.emailPlaceholder === 'Bulk Email'){
      //   formValue.bulkEmail = formValue.bulkEmail.split(',').map((email: string) => email.trim());
      // }
      if (this.mailThrouth === 'sendGrid') {
        this.emailService.sendEmailThroughSendGrid(formValue).subscribe({
          next: (message: any) => {
            this.notificationService.showSuccess(message);
          },
          error: (errorMessage: any) => {
            this.notificationService.showError(errorMessage.error.text);
          },
        });
      } else if (this.mailThrouth === 'alibaba') {
        this.emailService.sendEmailThroughAlibaba(formValue).subscribe({
          next: (message: any) => {
            this.notificationService.showSuccess(message);
          },
          error: (errorMessage: any) => {
            this.notificationService.showError(errorMessage.error.text);
          },
        });
      }
    } else {
      this.notificationService.showError('Please fill out the form correctly.');
    }
  }

  sendAuto() {
    if (this.emailForm.valid) {
      console.log('Send Auto button clicked', this.emailForm.value);
      // Implement your send auto logic here
    } else {
      console.log('Form is invalid');
    }
  }

  saveTemp() {
    if (this.emailForm.valid) {
      console.log('Save Temp button clicked', this.emailForm.value);
      // Implement your save temp logic here
    } else {
      console.log('Form is invalid');
    }
  }

  updateEmailField(emailType: string) {
    if (emailType === 'test') {
      this.emailPlaceholder = 'Test Email';
      this.emailLabel = 'Test Email';
    } else if (emailType === 'bulk') {
      this.emailPlaceholder = 'Bulk Email';
      this.emailLabel = 'Bulk Email';
    }
  }

  openPreview(): void {
    const dialogRef = this.dialog.open(EmailPreviewDialogComponent, {
      width: '600px',
      data: { body: this.emailForm.get('body')?.value },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected = true;
    }
  }

  submitDataForm() {
    // Handle data form submission logic here
    console.log(this.dataForm.value);
  }

  uploadFile() {
    if (this.selectedFile && this.dataForm.get('separationCount')?.value) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append(
        'separationCount',
        this.dataForm.get('separationCount')?.value
      );
      this.emailService.uploadDataFile(formData).subscribe((data) => {
        this.notificationService.showSuccess('Data uploaded successfully.');
      });
    } else {
      this.notificationService.showError('Please fill Separation Count field');
    }
  }

  getBlobFiles() {
    this.emailService.getFiles().subscribe((obj) => {
      this.dataFiles = obj;
      const formattedBlobUrls = this.dataFiles.join('\n');
      this.dataForm.controls['blobUrls'].setValue(formattedBlobUrls);
    });
  }

  createTempFile() {
    const tempFile = this.dataForm.get('tempFile')?.value;
    if (tempFile) {
      // const formData = new FormData();
      // formData.append('blobUrl', tempFile);
      this.emailService.createTempFile(tempFile).subscribe((data) => {
        this.dataForm.controls['tempFileName'].setValue(data);
        this.notificationService.showSuccess('Temp File created successfully.');
      });
    } else {
      this.notificationService.showError('Please fill Temp File field');
    }
  }
}
