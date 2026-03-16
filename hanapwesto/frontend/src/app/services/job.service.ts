import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  private api = `${environment.apiUrl}/jobs`;
  constructor(private http: HttpClient) {}

  getJobs(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(k => { if (filters[k]) params = params.set(k, filters[k]); });
    return this.http.get(this.api, { params });
  }

  getJobById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  getMyJobs(): Observable<any> {
    return this.http.get(`${this.api}/my`);
  }

  createJob(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateJob(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
