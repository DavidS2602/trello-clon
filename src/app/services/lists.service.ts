import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { CreateListDto, List } from '@app/interfaces/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  apiUrl = environment.API_URL
  constructor(private httpClient: HttpClient) { }

  create(dto: CreateListDto) {
    return this.httpClient.post<List>(`${this.apiUrl}/api/v1/lists`, dto,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
  }
}
