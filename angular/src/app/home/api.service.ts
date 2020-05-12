import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private url1 = 'https://jsonplaceholder.typicode.com/';
  private url2 = '/not-exist';
  constructor(private http: HttpClient) {}

  getJson(errorType: boolean, api: string): Observable<any[]> {
    const url = errorType ? `${this.url1}${api}` : `${this.url2}${api}`;
    return this.http.get(url).pipe(map((res: any) => res.splice(0, 5)));
  }
}
