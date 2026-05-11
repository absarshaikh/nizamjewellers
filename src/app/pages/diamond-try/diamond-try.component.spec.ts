import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondTryComponent } from './diamond-try.component';

describe('DiamondTryComponent', () => {
  let component: DiamondTryComponent;
  let fixture: ComponentFixture<DiamondTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiamondTryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiamondTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
