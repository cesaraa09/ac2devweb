import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/home/components/navbar/navbar.component';
import { UsersComponent } from './pages/home/components/users/users.component';
import { AddUserComponent } from './pages/home/components/add-user/add-user.component';
import { EditUserComponent } from './pages/home/components/edit-user/edit-user.component';
import { WelcomeComponent } from './pages/home/components/welcome/welcome.component';
import { TodoListComponent } from './pages/home/pages/todo-list/todo-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    WelcomeComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }