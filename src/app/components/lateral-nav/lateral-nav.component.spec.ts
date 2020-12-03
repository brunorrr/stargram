import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralNavComponent } from './lateral-nav.component';

describe('LateralNavComponent', () => {
  let component: LateralNavComponent;
  let fixture: ComponentFixture<LateralNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
