import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RequestStatus } from '@app/auth/interfaces/request-status';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './reset-password.component.html'
})
export default class ResetPasswordComponent {
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  //*Form
  public recoveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
  });
  status: RequestStatus = 'init';
  emailSent = false

  sendLink() {
    if (this.recoveryForm.valid) {
      this.status = 'loading';
      const formValue = this.recoveryForm.value;
      const email = formValue.email as string;
      this.authService.recovery(email).subscribe({
        next: () => {
          this.status = 'success';
          this.emailSent = true;
        },
        error: (error) => {
          this.status = 'failed';
          this.emailSent = false;
        }
      })
    } else {
      this.recoveryForm.markAllAsTouched();
    }
  }
}
