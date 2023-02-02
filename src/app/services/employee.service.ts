import { IEmployee } from './../models/employee';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<IEmployee[]> {
   return this.http.get<IEmployee[]>(`${API_CONFIG.baseURL}/employees`)
  }

  create(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(`${API_CONFIG.baseURL}/employees`, employee)
  }
}
