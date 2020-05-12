import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;

  test1: any;
  test2: any;

  constructor(private ApiService: ApiService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  generateTypeError() {
    this.test1.push(this.test2);
  }

  generateRecursionError() {
    const recursionFunc = (val: any) => {
      if (val > 0) {
        recursionFunc(val);
      }
    };
    recursionFunc(500);
  }

  /**
   * @param val - true for 404, false for 504
   * posts is correct endpoint
   */
  generateHTTPError(val: boolean) {
    const api = 'postsxx';
    this.ApiService.getJson(val, api).subscribe(
      (res) => {
        console.debug(res);
      },
      (err) => {
        throw throwError(err);
      }
    );
  }
}
