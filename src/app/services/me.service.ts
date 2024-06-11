import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/auth/interfaces/user';
import { environment } from '@app/environments/environment';
import { TokenService } from './token.service';
import { Board } from '@app/interfaces/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  apiUrl = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getMeProfile(): Observable<User> {
    const token = this.tokenService.getToken();
    return this.httpClient.get<User>(`${this.apiUrl}/api/v1/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getMeBoards(): Observable<Board[]> {
    const token = this.tokenService.getToken();
    return this.httpClient.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
