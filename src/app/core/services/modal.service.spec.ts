import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackBarService } from './modal.service';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as ModalFile from './modal.service';

describe('Service: SnackBarService', () => {
  let snackBarService!: SnackBarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [Router],
    });

    snackBarService = TestBed.inject(SnackBarService);
  });

  it('should create a service', () => expect(SnackBarService).toBeTruthy());

  it('should called snackbar function to show snackbar modal', () => {
    const snackbarSpy = spyOn(snackBarService, 'snackbar');

    snackBarService.snackbar('Test text');

    expect(snackbarSpy).toHaveBeenCalled();
  });

  it(`should return ['snack-success'] if passed variant success`, () => {
    const panelClass = ModalFile._panelClass('success');

    expect(panelClass).toEqual(['snack-success']);
  });
});
