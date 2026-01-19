import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { UserModel } from '../../models/user-model';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'home-page',
  imports: [FormsModule, CommonModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  public registeredUsers: Array<UserModel> = [];
  public emailLogged: string = localStorage.getItem('userEmail') || '';
  public userService : UserService;
  public selectedUserId : string = '';

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.getUsers().subscribe(users => {
      this.registeredUsers = users.filter(user => user.email !== this.emailLogged);
    });
  }
}