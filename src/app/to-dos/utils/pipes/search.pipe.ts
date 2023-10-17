import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TodoFormGroup } from '../interfaces/todo-form-group.interface';
import { ToDoService } from '../../services';
import { ToDo } from '../interfaces/todo-interface';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _toDoService: ToDoService
  ) {}

  public transform(
    todoListFormArray: FormArray<FormGroup<TodoFormGroup>>,
    name: string | null
  ): FormArray<FormGroup<TodoFormGroup>> {
    console.log(this._toDoService.todoListFormArray.getRawValue());
    const list: FormArray<FormGroup<TodoFormGroup>> = this._fb.array([]) as any;

    list.clear();

    (!!name
      ? this._toDoService.todoListFormArray
          .getRawValue()
          ?.filter((todo) =>
            todo?.name?.toLowerCase()?.includes((name || '').toLowerCase())
          )
      : this._toDoService.todoListFormArray.getRawValue()
    )
      .map((todo) => this._toDoService.todoFormGroup(todo as ToDo))
      .forEach((todo: FormGroup<TodoFormGroup>) => list.push(todo));

    return list;
  }
}
