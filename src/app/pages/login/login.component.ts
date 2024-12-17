import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslatePipe } from '../../core/pipelines/translate.pipe';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/auth.model';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'for-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzButtonComponent,
    TranslatePipe,
    NzAlertComponent,
    NzIconDirective,
    NzTooltipDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  isLoading: boolean = false;
  loginError = signal('');

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError.set('');

      const { username, password } = this.loginForm.value;

      this.authService.authLogin(username, password).subscribe({
        next: (res: UserModel[]) => {
          this.isLoading = false;
          if (res.length > 0) {
            if (
              res.some(
                (user: UserModel) =>
                  user.password === password && user.email === username,
              )
            ) {
              this.router.navigate(['/offer-list']);
            } else {
              this.loginError.set('PASSWORD_WARNING');
            }
          } else {
            this.loginError.set('PASSWORD_WARNING');
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
