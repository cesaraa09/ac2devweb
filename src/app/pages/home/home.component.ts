import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userSummary = {
    totalUsers: 3,
    roles: [
      { role: 'Engenheiro de FE', count: 1 },
      { role: 'Analista de dados', count: 1 },
      { role: 'Líder Técnico', count: 1 }
    ]
  };
}
