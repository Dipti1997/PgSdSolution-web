import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = environment.hostUrl;

  constructor(private http: HttpClient) {}

  sendEmailThroughSendGrid(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/sendgrid/send-email', data);
  }
  sendEmailThroughAlibaba(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/alibaba/send-email', data);
  }

  uploadDataFile(dataFile: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/azure/upload', dataFile, {
      responseType: 'text',
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(this.apiUrl + '/azure/list-blobs');
  }

  createTempFile(tempFile: any): Observable<any> {
    return this.http.get(
      this.apiUrl + '/azure/create-temp-file?blobUrl=' + tempFile,
      { responseType: 'text' }
    );
  }
}
