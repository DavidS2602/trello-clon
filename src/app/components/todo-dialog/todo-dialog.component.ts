import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ToDo } from 'src/models/todo.model';
import { Card } from '@app/interfaces/card';

interface actions {
  img: string;
  action: string;
}

interface OutputData {
  rta: Boolean;
}

interface InputData {
  card: Card;
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [],
  templateUrl: './todo-dialog.component.html'
})


export class TodoDialogComponent {

  card!: Card

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) private data: InputData
  ) {
    this.card = data.card;
  }
  ngOnInit(): void { }

  close() {
    this.dialogRef.close({
      rta: true
    });
  }

  closeWithRta(rta: Boolean) {
    this.dialogRef.close({
      rta
    });
  }

  actions: actions[] = [
    { img: 'assets/Icons/members.svg', action: 'Miembros' },
    { img: 'assets/Icons/label.svg', action: 'Etiquetas' },
    { img: 'assets/Icons/checkbox.svg', action: 'Checklist' },
    { img: 'assets/Icons/time.svg', action: 'Fechas' },
    { img: 'assets/Icons/paperclip.svg', action: 'Adjunto' },
    { img: 'assets/images/whatsapp.png', action: 'Portada' },
    { img: 'assets/images/whatsapp.png', action: 'Campos personalizados' },
  ];
}
