import { Component } from '@angular/core';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userList: User[] = [
    { name: 'Jose Teixeira', email: 'jt123@example.com', role: 'Engenheiro de FE' },
    { name: 'Roberto Silva', email: 'rs123@example.com', role: 'Analista de dados' },
    { name: 'Emily Rocha', email: 'em123@example.com', role: 'Líder Técnico' }
  ];

  addUser(user: User) {
    this.userList.push(user);
  }

  deleteUser(index: number) {
    this.userList.splice(index, 1);
  }
}
