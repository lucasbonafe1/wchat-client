import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../../models/login-model';
import { AuthService } from '../../services/auth-service';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'acess-page',
  imports: [CommonModule,FormsModule, RegisterComponent, LoginComponent],
  templateUrl: './acess.component.html',
  styleUrl: './acess.component.css'
})
export class AcessComponent {
  public authService: AuthService;
  public router: Router;
  protected isLogin: boolean = false;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  } 

  toggleCondition() : void{
    this.isLogin = !this.isLogin;
  }
}
