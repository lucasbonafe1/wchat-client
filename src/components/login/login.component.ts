import { Component } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { AuthService } from '../../services/auth-service';
import { Router } from 'express';

@Component({
  selector: 'login-component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  onSubmit(email: string, password: string) {
    const loginModel = new LoginModel(email, password);
    if (!loginModel.email || !loginModel.password) return;

    this.authService.login(loginModel).subscribe({
      next: authModel => {
        localStorage.setItem('bearer-token', authModel.accessToken);
        localStorage.setItem('token-expiration', authModel.expiresIn.toString());
      },
      error: err => {
        console.error('Erro ao salvar usuário:', err);
      }
    });
  }
}
