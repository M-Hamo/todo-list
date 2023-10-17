import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../interfaces/todo-interface';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  public transform(list: ToDo[], name: string | null): ToDo[] {
    return list.filter((item: ToDo) =>
      item?.name?.toLowerCase()?.includes(name?.toLowerCase() || '')
    );
  }
}
