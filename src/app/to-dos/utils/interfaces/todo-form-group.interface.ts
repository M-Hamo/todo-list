import { FormControl } from '@angular/forms';

export interface TodoFormGroup {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
}
