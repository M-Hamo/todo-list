import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { ToDo, TodoFormGroup } from '../utils';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ToDoService {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _toasterService: ToastrService,
    private readonly _translateService: TranslateService
  ) {
    this.getList();

    this.todoListFormArray.valueChanges.subscribe(console.log);
  }

  public readonly todoListItems: WritableSignal<ToDo[]> = signal([]);

  private readonly _effect$ = effect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(this.todoListItems()));
  });

  public form: FormGroup<any> = this._fb.group({
    todoList: this._fb.array([]),
  });

  public get todoListFormArray(): FormArray<FormGroup<TodoFormGroup>> {
    return this.form.get('todoList') as FormArray<FormGroup<TodoFormGroup>>;
  }

  public addTodo = (name?: string): void => {
    if (!this.todoListItems()[this.todoListItems()?.length - 1]?.name) {
      this._toasterService.error(
        this._translateService.instant('checkInvalidInputs')
      );

      // this.todoListFormArray.markAllAsTouched();
      return;
    }

    const id: string = this.generateUniqueId();

    this.todoListItems.mutate((list: ToDo[]) =>
      list.push({ id, name: name as string })
    );
    // this.todoListFormArray.push(this.todoFormGroup());
  };

  public deleteTodoItem = (formGroup: FormGroup<TodoFormGroup>): void => {
    // if()
    const index: number = this.todoListFormArray
      .getRawValue()
      ?.findIndex((group) => group?.id == formGroup?.value?.id);

    this.todoListFormArray.removeAt(index);

    this._toasterService.success(
      this._translateService.instant('todoDeletedSuccess')
    );
  };

  public todoFormGroup = (todo?: ToDo): FormGroup<TodoFormGroup> => {
    return this._fb.group({
      id: todo?.id || this.generateUniqueId(),
      name: [todo?.name || '', Validators.required],
    });
  };

  private generateUniqueId = (): string => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get the current timestamp

    return timestamp + Math.random().toString(36).substring(2, 5);
  };

  private getList = (): void => {
    const todoList = localStorage.getItem(TODO_LIST)
      ? localStorage.getItem(TODO_LIST)
      : [];
  };
}

const TODO_LIST = 'todo-list';
