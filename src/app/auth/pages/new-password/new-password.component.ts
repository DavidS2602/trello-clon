import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestStatus } from '@app/auth/interfaces/request-status';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [],
  templateUrl: './new-password.component.html',
  styles: ``
})
export default class NewPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.token = token;
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  //*Checking if the password and confirmPassword are the same
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  public passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required,]]
  }, {
    validators: this.isFieldOneEqualFieldTwo('password', 'confirmPassword')
  });
  status: RequestStatus = 'init'
  token: string = '';

  recovery() {
    if (this.passwordForm.valid) {
      this.status = 'loading';
      const formValue = this.passwordForm.value;
      const newPassword = formValue.password as string;
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigateByUrl('/auth/login');
        },
        error: (error) => {
          this.status = 'failed';
        }
      })
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
