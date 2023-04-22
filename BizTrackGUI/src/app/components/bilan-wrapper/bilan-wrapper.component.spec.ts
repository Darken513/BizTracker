import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanWrapperComponent } from './bilan-wrapper.component';

describe('BilanWrapperComponent', () => {
  let component: BilanWrapperComponent;
  let fixture: ComponentFixture<BilanWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
