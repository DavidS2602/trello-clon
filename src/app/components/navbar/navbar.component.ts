import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, OverlayModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false
}
