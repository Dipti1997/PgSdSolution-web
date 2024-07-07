import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.hostUrl;

  constructor(private http: HttpClient) { }

  sendEmailThroughSendGrid(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/sendgrid/send-email", data);
  }
  sendEmailThroughAlibaba(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/alibaba/send-email", data);
  }
}
