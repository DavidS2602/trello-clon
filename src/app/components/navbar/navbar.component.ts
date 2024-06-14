import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/auth/interfaces/user';
import { BoardFormComponent } from '../board-form/board-form.component';

interface WorkSpaces {
  img?: string;
  title: string;
  subtitle: string;
  isHovered?: boolean;
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    OverlayModule,
    BoardFormComponent,
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{
  isOpen = false
  isWorkSpaceOpen = false
  isRecentOpen = false
  isMarketOpen = false
  isTemplatesOpen = false
  isCreateBoardOpen = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.user = user
    })
  }

  user: User | null = null

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }

  close(event: boolean) {
    this.isCreateBoardOpen = event
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
