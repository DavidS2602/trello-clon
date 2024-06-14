import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { Board } from '@app/interfaces/board';
import { Card } from '@app/interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  apiUrl = environment.API_URL;
  bufferSpace = 65535
  constructor(private httpClient: HttpClient) { }

  getBoard(id: Board['id']) {
    return this.httpClient.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  createBoard(title: string, backgroundColor: string) {
    return this.httpClient.post<Board>(`${this.apiUrl}/api/v1/boards`, {
      title,
      backgroundColor
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this.bufferSpace
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position
      return onTopPosition / 2
    }
    const lastIndex = cards.length - 1
    if (cards.length > 2 && currentIndex === 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position
      const nextPosition = cards[currentIndex + 1].position
      return prevPosition + nextPosition / 2
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[currentIndex - 1].position
      return onBottomPosition + this.bufferSpace
    }
    return 0
  }
}
