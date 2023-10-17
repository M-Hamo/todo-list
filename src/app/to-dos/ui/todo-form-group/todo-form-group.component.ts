import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoFormGroup } from '../../utils';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'todo-form-group',
  templateUrl: './todo-form-group.component.html',
  styleUrls: ['./todo-form-group.component.scss'],
})
export class TodoFormGroupComponent {
  public constructor(
    private readonly _toasterService: ToastrService,
    private readonly _translateService: TranslateService
  ) {}
  @ViewChild('nameInput') public nameInput!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) public todoForm!: FormGroup<TodoFormGroup>;

  @Output() public readonly onDeleteTodo = new EventEmitter<unknown>();

  public name: FormControl<string | null> = new FormControl(
    null,
    Validators.required
  );

  private _cashedValue: WritableSignal<string> = signal<string>('');

  public editMode: WritableSignal<boolean> = signal<boolean>(true);

  public onEditTodo = (): void => {
    this.editMode.set(true);

    window.setTimeout(() => this.nameInput.nativeElement.focus());
  };

  public onSaveValue = (): void => {
    if (this.name.valid) {
      this.todoForm.get('name')?.patchValue(this.name.value);

      this._toasterService.success(
        this._translateService.instant(
          !!this._cashedValue() ? 'todoUpdateSuccess' : 'todoCreatedSuccess'
        )
      );

      this._cashedValue.set(this.name?.value as string);
      this.editMode.set(false);
    }
  };

  public onCancelEdit = (): void => {
    if (this.todoForm.get('name')?.invalid) {
      this.onDeleteTodo.emit();
      return;
    }

    this.todoForm.get('name')?.patchValue(this._cashedValue());
    this.editMode.set(false);
  };
}
