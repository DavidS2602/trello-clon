import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';

interface Workspace {
  icon: string;
  text: string;
  SecondIcon?: string;
}
@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, CdkAccordionModule],
  templateUrl: './boards.component.html'
})
export default class BoardsComponent {
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
}
