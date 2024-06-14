import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Card, CreateCardDto, UpdateCardDto } from '@app/interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl = environment.API_URL
  constructor(private httpClient: HttpClient) { }

  create(dto: CreateCardDto) {
    return this.httpClient.post<Card>(`${this.apiUrl}/api/v1/cards`, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  update(id: Card['id'], changes: UpdateCardDto) {
    return this.httpClient.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
