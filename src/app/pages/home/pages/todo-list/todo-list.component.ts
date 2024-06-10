import { Component } from '@angular/core';

interface Task {
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  taskList: Task[] = [
    { description: 'Desenvolver novos componentes UI', done: false },
    { description: 'Corrigir bugs no código JavaScript', done: false },
    { description: 'Revisar pull requests no GitHub', done: false },
    { description: 'Analisar tendências de vendas mensais', done: false },
    { description: 'Preparar relatório de desempenho trimestral', done: false },
    { description: 'Limpar e processar dados brutos', done: false }
  ];

  changeTask(task: Task) {
    task.done = !task.done;
  }
}
