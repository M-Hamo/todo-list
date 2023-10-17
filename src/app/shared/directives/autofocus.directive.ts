import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autofocus]',
  standalone: true,
})
export class AutofocusDirective {
  public constructor(private el: ElementRef) {}

  private focus = true;

  public ngOnInit(): void {
    if (this.focus) window.setTimeout(() => this.el.nativeElement.focus());
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }
}
