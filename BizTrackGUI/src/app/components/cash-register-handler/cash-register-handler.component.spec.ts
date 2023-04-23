import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterHandlerComponent } from './cash-register-handler.component';

describe('CashRegisterHandlerComponent', () => {
  let component: CashRegisterHandlerComponent;
  let fixture: ComponentFixture<CashRegisterHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashRegisterHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
