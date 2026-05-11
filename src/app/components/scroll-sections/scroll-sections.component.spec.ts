import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSectionsComponent } from './scroll-sections.component';

describe('ScrollSectionsComponent', () => {
  let component: ScrollSectionsComponent;
  let fixture: ComponentFixture<ScrollSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
