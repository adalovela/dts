import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SampleInterface {
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  constructor(private httpClient: HttpClient) {}
}
