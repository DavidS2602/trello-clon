import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Board } from '@app/interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

  getBoard(id: Board['id']) {
    return this.httpClient.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
