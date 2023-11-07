import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from '../../utils';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ToDoService } from '../../services';

@Component({
  selector: 'todo-form-group',
  templateUrl: './todo-form-group.component.html',
  styleUrls: ['./todo-form-group.component.scss'],
})
export class TodoFormGroupComponent implements OnInit {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _toasterService: ToastrService,
    private readonly _translateService: TranslateService,
    private readonly _toDoService: ToDoService
  ) {}
  @ViewChild('nameInput') public nameInput!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) public todo!: ToDo;

  @Output() public readonly onEditTodo = new EventEmitter<ToDo>();

  @Output() public readonly onDeleteTodo = new EventEmitter<unknown>();

  public todoForm: FormGroup<any> = this._fb.group({
    name: [null, Validators.required],
  });

  private _cashedValue: WritableSignal<string> = signal<string>('');

  public editMode: WritableSignal<boolean> = signal<boolean>(true);

  public ngOnInit(): void {
    if (!!this.todo?.name) {
      setTimeout(() => this.todoForm.patchValue({ name: this.todo?.name }));
      this._cashedValue.set(this.todo?.name);
      this.editMode.set(false);
    }
  }

  public editTodo = (): void => {
    this.editMode.set(true);

    window.setTimeout(() => this.nameInput.nativeElement.focus());
  };

  public onSaveValue = (): void => {
    if (this.todoForm.valid) {
      const name: string = this.todoForm.get('name')?.value as string;

      const isExist: boolean = !!this._toDoService
        .todoListItems()
        ?.find((item: ToDo) => item?.name === name?.trim());

      if (isExist) {
        this._toasterService.warning('Todo is already exist');
        return;
      }

      this.onEditTodo.emit({ ...this.todo, name: name?.trim() });

      this._toasterService.success(
        this._translateService.instant(
          !!this._cashedValue() ? 'todoUpdateSuccess' : 'todoCreatedSuccess'
        )
      );

      this._cashedValue.set(name);
      this.editMode.set(false);
    }
  };

  public onCancelEdit = (): void => {
    if (this.todoForm?.invalid) {
      !!this._cashedValue() &&
        this.todoForm.patchValue({ name: this._cashedValue() });
    }

    !!this._cashedValue()
      ? this.todoForm.patchValue({ name: this._cashedValue() })
      : this.onDeleteTodo.emit();

    this.editMode.set(false);
  };
}
