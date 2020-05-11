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

  generateError1() {
    this.test1.push(this.test2);
    console.error('Error 1 generated.');
  }

  generateError2() {
    const recursionFunc = (val: any) => {
      if (val > 0) {
        recursionFunc(val);
      }
    };
    recursionFunc(500);
  }

  generateError3() {
    // posts is correct endpoint
    // true for 404, false for 505
    const api = 'postsxxxxxx';
    this.ApiService.getJson(true, api).subscribe(
      (res) => {
        console.debug(res);
      },
      (err) => {
        throw throwError(err);
      }
    );
  }
}
