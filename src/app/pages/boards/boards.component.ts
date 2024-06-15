import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { RouterLinkWithHref } from '@angular/router';
import { MeService } from '@app/services/me.service';
import { Board } from '@app/interfaces/board';
import { CardColorComponent } from '@app/shared/components/card-color/card-color.component';

interface Workspace {
  icon: string;
  text: string;
  SecondIcon?: string;
}
@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, CdkAccordionModule, RouterLinkWithHref, CardColorComponent],
  templateUrl: './boards.component.html'
})
export default class BoardsComponent implements OnInit{
  //*Inject services.
  constructor(
    private meService: MeService
  ) {}

  boards: Board[] = [];


  ngOnInit(): void {
    this.getMeBoards();
  }

  getMeBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    })
  }
}
