import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { RequestStatus } from '@app/auth/interfaces/request-status';
import { AuthService } from '@app/auth/services/auth.service';
import { get } from 'http';

interface Login {
  title: string;
  src: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export default class LoginComponent {
  //*Rules email validation
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      const email = params['email']
      if (email) {
        this.loginForm.get('email')?.setValue(email);
      }
    });
  }

  //*Form
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['d12345678', [Validators.required, Validators.minLength(6)]]
  });

  status: RequestStatus = 'init';

  doLogin() {
    if (this.loginForm.valid) {
      this.status = 'loading';
      const formValue = this.loginForm.value;
      const email = formValue.email as string;  // Casting to string
      const password = formValue.password as string;  // Casting to string

      if (email && password) {

        this.authService.login(email, password).subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigateByUrl('/boards');
          },
          error: (error) => {
            console.error('Login error:', error);  // Log the error response
            this.status = 'failed';
          }
        });
      } else {
        this.status = 'failed';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

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
  ];
}
