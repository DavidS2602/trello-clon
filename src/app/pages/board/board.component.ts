import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@app/components/todo-dialog/todo-dialog.component';
import { BoardsService } from '@app/services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@app/interfaces/board';
import { Card } from '@app/interfaces/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    DragDropModule,
    NavbarComponent,
    CdkDropListGroup,
    CdkDropList,
    CommonModule,
  ],
  templateUrl: './board.component.html',
  styles: [`
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export default class BoardComponent implements OnInit {

  board: Board | null = null;

  constructor(
    private dialog: Dialog,
    private boardService: BoardsService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    })
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }



  addColumn() {
    //this.columns.push({
      //id: this.nextColumnId++,
      //title: 'New Column',
      //todos: []
    //})
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        card: card
      }
    })
    dialogRef.closed.subscribe(result => {
      console.log(result)
    });
  }

  private getBoard(id: string) {
    this.boardService.getBoard(id)
      .subscribe((board) => {
        this.board = board;
      });
  }
}
