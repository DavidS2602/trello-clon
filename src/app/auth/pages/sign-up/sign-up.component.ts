import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { RequestStatus } from '@app/auth/interfaces/request-status';


interface InputField {
  name: string;
  type: string;
  placeholder: string;
}

interface SignUp {
  title: string;
  src: string;
}


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

  //*Rules validation
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

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

  //!Add dependencies
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  public formUser = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  })


  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password', 'confirmPassword')
    ]
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  showRegister = false

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('pattern')) {
      if (field === 'email') {
        return 'Correo no válido';
      }
      if (field === 'name') {
        return 'Nombre no válido';
      }
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `La contraseña debe tener al menos ${requiredLength} caracteres`;
    }
    if (control?.hasError('notEqual')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  //*Render register inputs
  inputFields: InputField[] = [
    { name: 'name', type: 'text', placeholder: 'Introduce tu nombre' },
    { name: 'email', type: 'email', placeholder: 'Introduce tu correo' },
    { name: 'password', type: 'password', placeholder: 'Introduce tu contraseña' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirma tu contraseña' }
  ];

  register() {
    if (this.registerForm.valid) {
      this.status = 'loading';
      const formValue = this.registerForm.value;
      const name = formValue.name as string;
      const email = formValue.email as string;
      const password = formValue.password as string;
      if (name && email && password) {
        this.authService.registerAndLogin(name, email, password)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigateByUrl('/boards');
            console.log('Register success')
          },
          error: (error) => {
            console.error('Register error:', error);
            this.status = 'failed';
          }
        });
      }
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const email = this.formUser.get('email')?.value as string;
      if (email) {
        this.authService.isAvailable(email)
        .subscribe({
          next: (rta) => {
            this.statusUser = 'success';
            if (rta.isAvailable) {
              this.showRegister = true;
              this.registerForm.controls.email.setValue(email);
            } else {
              this.router.navigateByUrl('/auth/login'), {
                queryParams: {
                  email: email
                }
              };
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.statusUser = 'failed';
          }
        });
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }


  SignUp: SignUp[] = [
    {
      title: 'Google',
      src: '/assets/Icons/icons8-google.svg'
    },
    {
      title: 'Microsoft',
      src: '/assets/Icons/icons8-microsoft.svg'
    },
    {
      title: 'Apple',
      src: '/assets/Icons/icons8-apple.svg'
    },
    {
      title: 'Slack',
      src: '/assets/Icons/icons8-slack.svg'
    },
  ]
}
