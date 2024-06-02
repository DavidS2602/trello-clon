import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

interface Login {
  title: string;
  src: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './login.component.html'
})
export default class LoginComponent {
  logins: Login[] = [
    {
      title: 'Google',
      src:'/assets/Icons/icons8-google.svg'
    },
    {
      title: 'Microsoft',
      src:'/assets/Icons/icons8-microsoft.svg'
    },
    {
      title: 'Apple',
      src:'/assets/Icons/icons8-apple.svg'
    },
    {
      title: 'Slack',
      src:'/assets/Icons/icons8-slack.svg'
    },
  ]
}
