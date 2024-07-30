import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutcomeInformationComponent } from './form-outcome-information.component';

describe('FormOutcomeInformationComponent', () => {
  let component: FormOutcomeInformationComponent;
  let fixture: ComponentFixture<FormOutcomeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOutcomeInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOutcomeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
