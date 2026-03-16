import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private api = `${environment.apiUrl}/applications`;
  constructor(private http: HttpClient) {}
  apply(jobId: string, message: string): Observable<any> { return this.http.post(`${this.api}/job/${jobId}`, { message }); }
  getMyApplications(): Observable<any> { return this.http.get(`${this.api}/my`); }
  getJobApplications(jobId: string): Observable<any> { return this.http.get(`${this.api}/job/${jobId}`); }
  updateStatus(id: string, status: string): Observable<any> { return this.http.patch(`${this.api}/${id}/status`, { status }); }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}
  getWorkers(filters: any = {}): Observable<any> {
    const params = new (require('@angular/common/http').HttpParams)();
    return this.http.get(`${this.api}/workers`, { params: filters });
  }
  getUserById(id: string): Observable<any> { return this.http.get(`${this.api}/${id}`); }
  updateProfile(data: any): Observable<any> { return this.http.patch(`${this.api}/me`, data); }
  getUserRatings(id: string): Observable<any> { return this.http.get(`${this.api}/${id}/ratings`); }
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = `${environment.apiUrl}/notifications`;
  private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> { return this.http.get(this.api); }
  markRead(id: string): Observable<any> { return this.http.patch(`${this.api}/${id}/read`, {}); }
  markAllRead(): Observable<any> { return this.http.patch(`${this.api}/read-all`, {}); }
  setUnread(n: number): void { this.unreadCount.next(n); }
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private api = `${environment.apiUrl}/ratings`;
  constructor(private http: HttpClient) {}
  submit(data: { applicationId: string; score: number; comment?: string }): Observable<any> { return this.http.post(this.api, data); }
  getUserRatings(userId: string): Observable<any> { return this.http.get(`${this.api}/user/${userId}`); }
}

export interface Toast { message: string; type: 'success' | 'error' | 'info'; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();
  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const list = [...this.toasts.value, { message, type }];
    this.toasts.next(list);
    setTimeout(() => { this.toasts.next(this.toasts.value.slice(1)); }, 3500);
  }
  success(msg: string): void { this.show(msg, 'success'); }
  error(msg: string): void { this.show(msg, 'error'); }
  info(msg: string): void { this.show(msg, 'info'); }
}
