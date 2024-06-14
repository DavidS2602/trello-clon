import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsService } from '@app/services/boards.service';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {
  @Output() closeOverlay = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private boardService : BoardsService,
    private router : Router,
  ) {}

  public boardForm = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: ['', [Validators.required]]
  });

  doSave() {
    if (this.boardForm.valid) {
      const { title, backgroundColor } = this.boardForm.value;
      if (title && backgroundColor !== undefined) {
        this.boardService.createBoard(title, backgroundColor)
          .subscribe(board => {
            this.closeOverlay.next(false);
            this.router.navigateByUrl(`/boards/${board.id}`);
          });
      }
    } else {
      this.boardForm.markAllAsTouched();
    }
  }
}
