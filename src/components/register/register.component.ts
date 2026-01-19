import { Component } from '@angular/core';
import { RegisterModel } from '../../models/register-model';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'register-component',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService: AuthService;
  protected errorMessage : string = '';

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  OnRegister(username: string, email: string, confirmEmail: string, password: string) {
    this.errorMessage = '';

    if (email !== confirmEmail) {
      this.errorMessage = 'Os e-mails não coincidem.';
      return;
    }
   
    const registerModel = new RegisterModel(username, email, password);

    this.authService.register(registerModel).subscribe({
      next: () => {
        console.log('Usuário registrado com sucesso.');
        // toast de sucesso e redirecionamento pode ser feito aqui
      },
      error: err => {
        this.errorMessage = 'Erro ao registrar usuário: ' + err.message;
        console.error('Erro ao registrar usuário:', err);
      }
    });
  }
}
