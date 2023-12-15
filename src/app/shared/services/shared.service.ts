import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  constructor() {}

  public get userToken(): string | null {
    return localStorage.getItem('TOKEN');
  }


  public async set_token(token: string) {
    localStorage.setItem('TOKEN', token);
  }
}
