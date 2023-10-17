import { Component, Signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Animations } from '@shared/animations/animations';
import { ToDoService } from '../../services';
import { ToDo } from '../../utils';

@Component({
  selector: 'todo-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  animations: [Animations],
})
export class ToDoListComponent {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _toDoService: ToDoService
  ) {}

  public search: FormControl<string | null> = this._fb.control(null);

  public readonly todoListItems: Signal<ToDo[]> =
    this._toDoService.todoListItems;

  public onAddTodo = (): void => {
    this._toDoService.addTodo();
  };

  public onEditTodo = (todo: ToDo): void => {
    this._toDoService.updateTodo(todo);
  };

  public onDeleteTodo = (todo: ToDo): void => {
    this._toDoService.deleteTodoItem(todo);
  };
}
