import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class SharedService {
  constructor(private http: HttpClient) {}

  get_user(id: string) {
    return this.http.get(environment.baseUrl + 'user/' + id);
  }
}
