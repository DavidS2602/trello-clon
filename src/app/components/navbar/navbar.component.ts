import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

interface WorkSpaces {
  img?: string;
  title: string;
  subtitle: string;
  isHovered?: boolean;
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, OverlayModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false
  isWorkSpaceOpen = false
  isRecentOpen = false
  isMarketOpen = false
  isTemplatesOpen = false

  workSpaces: WorkSpaces[] = [
    {
      img: '',
      title: '6to semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
    {
      img: '',
      title: '5to semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
    {
      img: '',
      title: '4to semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
    {
      img: '',
      title: '3er semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
    {
      img: '',
      title: '2do semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
    {
      img: '',
      title: '1er semestre',
      subtitle: 'Ingeniería en sistemas',
      isHovered: false
    },
  ]
}
