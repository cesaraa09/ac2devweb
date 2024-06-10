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
    { description: 'Corrigir bugs no c�digo JavaScript', done: false },
    { description: 'Revisar pull requests no GitHub', done: false },
    { description: 'Analisar tend�ncias de vendas mensais', done: false },
    { description: 'Preparar relat�rio de desempenho trimestral', done: false },
    { description: 'Limpar e processar dados brutos', done: false }
  ];

  changeTask(task: Task) {
    task.done = !task.done;
  }
}
