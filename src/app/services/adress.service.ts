import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { IAdress } from './../models/adress';

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<IAdress> {
    return this.http.get<IAdress>(`${API_CONFIG.baseURL}/adress/${id}`)
  }

  findAll():Observable<IAdress[]> {
    return this.http.get<IAdress[]>(`${API_CONFIG.baseURL}/adress`)
  }

  create(adress: IAdress): Observable<IAdress> {
   return this.http.post<IAdress>(`${API_CONFIG.baseURL}/adress`, adress)
  }

  update(adress: IAdress): Observable<IAdress> {
    return this.http.put<IAdress>(`${API_CONFIG.baseURL}/adress/${adress.id}`, adress)
   }

   delete(id:any):Observable<IAdress> {
    return this.http.delete<IAdress>(`${API_CONFIG.baseURL}/adress/${id}`)
   }
 
}
