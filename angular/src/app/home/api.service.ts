import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private url = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  getJson(api: string): Observable<any[]> {
    const url = `${this.url}${api}`;
    return this.http.get(url).pipe(map((res: any) => res.splice(0, 5)));
  }
}
