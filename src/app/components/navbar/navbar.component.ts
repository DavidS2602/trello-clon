import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '@app/auth/services/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }


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
