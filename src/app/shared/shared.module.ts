import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShimmerLoadingComponent } from './components/shimmer-loading/shimmer-loading.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LanguageComponent } from './components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';

const DIRECTIVES: any[] = [];

const PIPES: any[] = [];

const UI_COMPONENTS: any[] = [NoDataComponent];

const THIRD_MODULES: any[] = [
  ShimmerLoadingComponent,
  LanguageComponent,
  NgOptimizedImage,
  TranslateModule,
];

const COMMON_MODULES: any[] = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...UI_COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...COMMON_MODULES, ...THIRD_MODULES],
  exports: [
    ...COMMON_MODULES,
    ...THIRD_MODULES,
    ...UI_COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [],
})
export class SharedModule {}
