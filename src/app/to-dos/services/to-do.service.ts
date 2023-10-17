import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { ToDo } from '../utils';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ToDoService {
  public constructor(
    private readonly _toasterService: ToastrService,
    private readonly _translateService: TranslateService
  ) {
    this.getList();
  }

  public readonly todoListItems: WritableSignal<ToDo[]> = signal([]);

  private readonly _effect$ = effect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(this.todoListItems()));
  });

  public addTodo = (): void => {
    if (
      this.todoListItems()?.length >= 1 &&
      !this.todoListItems()[this.todoListItems()?.length - 1]?.name
    ) {
      this._toasterService.error(
        this._translateService.instant('checkInvalidInputs')
      );

      return;
    }

    const id: string = this.generateUniqueId();

    this.todoListItems.set([...this.todoListItems(), { id, name: '' }]);
  };

  public updateTodo = (todo: ToDo): void => {
    if (!!todo?.id) {
      const editedList: ToDo[] = this.todoListItems().map((toDo: ToDo) =>
        toDo?.id === todo?.id ? todo : toDo
      );

      this.todoListItems.set(editedList);

      return;
    }
  };

  public deleteTodoItem = (todo: ToDo): void => {
    if (!!todo?.id) {
      const filteredList: ToDo[] = this.todoListItems().filter(
        (toDo: ToDo) => toDo?.id !== todo?.id
      );

      this.todoListItems.set(filteredList);

      this._toasterService.success(
        this._translateService.instant('todoDeletedSuccess')
      );
    }
  };

  private generateUniqueId = (): string => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get the current timestamp

    return timestamp + Math.random().toString(36).substring(2, 5);
  };

  private getList = (): void => {
    const todoList: any = !!localStorage.getItem(TODO_LIST)
      ? JSON.parse(localStorage.getItem(TODO_LIST) as string)
      : [];

    this.todoListItems.set(todoList);
  };
}

const TODO_LIST = 'todo-list';
