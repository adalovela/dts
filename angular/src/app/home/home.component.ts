import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

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
    const api = 'postsxxxxxx';
    this.ApiService.getJson(api).subscribe(
      (res) => {
        console.debug(res);
      },
      (err) => {
        console.debug(err);
      }
    );
  }
}
