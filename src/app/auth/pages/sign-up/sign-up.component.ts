import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

interface SignUp {
  title: string;
  src: string;
}


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {
  SignUp: SignUp[] = [
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
