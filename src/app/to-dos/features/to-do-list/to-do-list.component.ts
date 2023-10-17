import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Animations } from '@shared/animations/animations';
import { ToDoService } from '../../services';
import { TodoFormGroup } from '../../utils';

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

  public readonly todoListFormArray: FormArray<FormGroup<TodoFormGroup>> =
    this._toDoService.todoListFormArray;

  public onAddTodo = (): void => {
    this._toDoService.addTodo();
  };

  public onDeleteTodo = (todoForm: FormGroup<TodoFormGroup>): void => {
    this._toDoService.deleteTodoItem(todoForm);
  };
}
