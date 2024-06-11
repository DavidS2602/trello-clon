import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { RouterLinkWithHref } from '@angular/router';
import { MeService } from '@app/services/me.service';
import { Board } from '@app/interfaces/board';

interface Workspace {
  icon: string;
  text: string;
  SecondIcon?: string;
}
@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, CdkAccordionModule, RouterLinkWithHref],
  templateUrl: './boards.component.html'
})
export default class BoardsComponent implements OnInit{
  //*Inject services.
  constructor(
    private meService: MeService
  ) {}

  boards: Board[] = [];

  workspaceItem : Workspace[] = [
    {
      icon: '/assets/Icons/table-filled.svg',
      text: 'Tableros'
    },
    {
      icon: '/assets/Icons/heart.svg',
      text: 'Lo más destacado'
    },
    {
      icon: '/assets/Icons/Vistas.svg',
      text: 'Vistas'
    },
    {
      icon: '/assets/Icons/users-plus.svg',
      text: 'Miembros',
      SecondIcon: '/assets/Icons/Add.svg'
    },
    {
      icon: '/assets/Icons/settings.svg',
      text: 'Configuración'
    }
  ]

  ngOnInit(): void {
    this.getMeBoards();
  }

  getMeBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    })
  }
}
