import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactApiResponse {
  success?: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  submit(payload: ContactFormPayload): Observable<ContactApiResponse> {
    return this.http.post<ContactApiResponse>('/api/contact', payload);
  }
}
