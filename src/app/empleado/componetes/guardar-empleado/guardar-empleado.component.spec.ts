import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEmpleadoComponent } from './guardar-empleado.component';

describe('GuardarEmpleadoComponent', () => {
  let component: GuardarEmpleadoComponent;
  let fixture: ComponentFixture<GuardarEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuardarEmpleadoComponent]
    });
    fixture = TestBed.createComponent(GuardarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
