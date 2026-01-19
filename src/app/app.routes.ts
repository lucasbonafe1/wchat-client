import { Routes } from '@angular/router';
import { ChatComponent } from '../pages/chat/chat.component';
import { HomeComponent } from '../pages/home/home.component';
import { AcessComponent } from '../pages/acess/acess.component';

export const routes: Routes = [
    { path: '', component: AcessComponent },
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatComponent },
];
