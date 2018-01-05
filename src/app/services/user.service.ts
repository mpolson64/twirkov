import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  //private apiUrl = 'https://twirkov-api.herokuapp.com/api';
  private apiUrl = 'http://localhost:3000/api';

  getChain(screen_name: String): Observable<Object> {
    return this.http.get<Object>(`${this.apiUrl}/chain?screen_name=${screen_name}`);
  }

  getSeeds(screen_name: String): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiUrl}/seed?screen_name=${screen_name}`);
  }
}
