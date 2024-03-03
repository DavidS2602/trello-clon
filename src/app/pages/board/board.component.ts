import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ToDo } from 'src/models/todo.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent, CdkDropListGroup, CdkDropList],
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
export default class BoardComponent {

  todos: ToDo[] = [
    {
      id: '1',
      title: 'Make dishes'
    },
    {
      id: '2',
      title: 'Complete Launch'
    },
    {
      id: '3',
      title: 'Write Blog'
    },
  ];

  doing: ToDo[] = [
    {
      id: '5',
      title: 'Watch Angular path in Platzi'
    },
    {
      id: '6',
      title: 'Create a new project'
    }
  ];

  done: ToDo[] = [
    {
      id: '7',
      title: 'Prueba 7'
    },
    {
      id: '8',
      title: 'Prueba 8'
    }
  ];


  drop(event: CdkDragDrop<ToDo[]>) {
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
}
