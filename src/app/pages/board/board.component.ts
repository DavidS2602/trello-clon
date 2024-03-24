import { Component } from '@angular/core';
import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Column, ToDo } from 'src/models/todo.model';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@app/components/todo-dialog/todo-dialog.component';
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

  columns:Column[] = [
    {
      id: 1,
      title: 'To Do',
      todos: [
        {
          id: 1,
          title: 'Make dishes'
        },
        {
          id: 2,
          title: 'Complete Launch'
        },
        {
          id: 3,
          title: 'Write Blog'
        }
      ]
    },
    {
      id: 2,
      title: 'Doing',
      todos: [
        {
          id: 5,
          title: 'Watch Angular path in Platzi'
        },
        {
          id: 6,
          title: 'Create a new project'
        }
      ]
    },
    {
      id: 3,
      title: 'Done',
      todos: [
        {
          id: 7,
          title: 'Create a new project'
        },
        {
          id: 8,
          title: 'Create a new project'
        }
      ]

    }
  ]

  constructor(
    private dialog: Dialog
  ) {}

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


  nextColumnId: number = this.columns.length + 1;
  addColumn() {
    this.columns.push({
      id: this.nextColumnId++,
      title: 'New Column',
      todos: []
    })
  }

  addTodo(columnId: number) {
    const newTodoId = Math.max(...this.columns.flatMap(column => column.todos.map(todo => todo.id))) + 1;
    const newTodo: ToDo = {
      id: newTodoId,
      title: 'New Todo',
      editing: true
    };

    // Encontrar la columna correspondiente y agregar el nuevo todo
    const column = this.columns.find(c => c.id === columnId);
    if (column) {
      column.todos.push(newTodo);
    }
  }
  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        todo: todo
      }
    })
    dialogRef.closed.subscribe(result => {
      console.log(result)
    });
  }
}
