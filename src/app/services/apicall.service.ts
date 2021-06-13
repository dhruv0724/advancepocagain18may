import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  httpHeader = {
    "headers": new HttpHeaders().set("Content-Type", "application/json")
  }

  baseurl = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.baseurl + endpoint,this.httpHeader);
  }

  post<T, U>(endpoint: string, data: U): Observable<T> {
    return this.http.post<T>(this.baseurl + endpoint, JSON.stringify(data),this.httpHeader);
  }

  put<T, U>(endpoint: string, data: U): Observable<T> {
    return this.http.put<T>(this.baseurl + endpoint, JSON.stringify(data),this.httpHeader);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.baseurl + endpoint,this.httpHeader);
  }

}
