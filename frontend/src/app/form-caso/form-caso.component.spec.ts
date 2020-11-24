import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCasoComponent } from './form-caso.component';

describe('FormCasoComponent', () => {
  let component: FormCasoComponent;
  let fixture: ComponentFixture<FormCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCasoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
