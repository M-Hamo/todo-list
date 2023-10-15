import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarsComponent } from './stars.component';
import { By } from '@angular/platform-browser';

describe('Component: Stars', () => {
  let component!: StarsComponent;
  let fixture!: ComponentFixture<StarsComponent>;
  let sectionContainer!: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => expect(component).toBeTruthy());

  it('should make overflow width of the stars when there is a rate input', () => {
    component.rate = 20;
    fixture.detectChanges();

    expect(component.overflowWidth).toBe('464px');
  });

  it('should render starts box only if there is rate input', () => {
    component.rate = 20;
    fixture.detectChanges();

    const sectionElement = fixture.debugElement.query(By.css('section'));

    sectionContainer = sectionElement.nativeElement;

    fixture.detectChanges();

    expect(sectionContainer).toBeTruthy();
  });

  it(`shouldn't render starts box if there is no rates input`, () => {
    const sectionElement = fixture.debugElement.query(By.css('section'));

    fixture.detectChanges();

    expect(sectionElement).toBeFalsy();
  });
});
