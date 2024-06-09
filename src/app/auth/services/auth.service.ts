import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { TokenService } from '@app/services/token.service';
import { switchMap, tap } from 'rxjs';
import { ResponseLogin } from '../interfaces/auth.model';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL
  //*Interfaces

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.httpClient.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      })
    )
  }
  register(name: string, email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name,email,password)
      .pipe(
        switchMap(() => this.login(email,password))
      );
  }

  isAvailable(email: string) {
    return this.httpClient.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, {email});
  }

  recovery(email: string) {
    return this.httpClient.post(`${this.apiUrl}/api/v1/auth/recovery`, {email});
  }

  getProfile() {
    const token = this.tokenService.getToken();
    return this.httpClient.get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  changePassword(token: string, newPassword: string) {
    return this.httpClient.post(`${this.apiUrl}/api/v1/auth/change-password`, {token, newPassword});
  }

  logout() {
    this.tokenService.removeToken();
  }

}
