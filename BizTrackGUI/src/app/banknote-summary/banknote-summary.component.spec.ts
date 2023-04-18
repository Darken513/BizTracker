import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanknoteSummaryComponent } from './banknote-summary.component';

describe('BanknoteSummaryComponent', () => {
  let component: BanknoteSummaryComponent;
  let fixture: ComponentFixture<BanknoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanknoteSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanknoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
