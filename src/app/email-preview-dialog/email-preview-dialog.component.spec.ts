import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPreviewDialogComponent } from './email-preview-dialog.component';

describe('EmailPreviewDialogComponent', () => {
  let component: EmailPreviewDialogComponent;
  let fixture: ComponentFixture<EmailPreviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailPreviewDialogComponent]
    });
    fixture = TestBed.createComponent(EmailPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
