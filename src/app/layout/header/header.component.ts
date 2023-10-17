import { Component, Signal, WritableSignal, computed } from '@angular/core';
import { BidirectionallyService } from 'src/app/core/services/bidirectionally.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public constructor(
    private readonly _langService: LanguageService,
    private readonly _bidirectionallyService: BidirectionallyService
  ) {}

  public readonly selectedLang: WritableSignal<string | null> =
    this._langService.lang;

  public readonly direction: Signal<string> = computed(() =>
    this._bidirectionallyService.direction() !== 'ltr' ? 'left' : 'right'
  );

  public toggleLang = (): void => {
    this._langService.setLanguage(this.selectedLang() === 'en' ? 'ar' : 'en');
  };
}
