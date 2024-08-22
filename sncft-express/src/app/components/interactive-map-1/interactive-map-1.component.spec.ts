import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveMap1Component } from './interactive-map-1.component';

describe('InteractiveMap1Component', () => {
  let component: InteractiveMap1Component;
  let fixture: ComponentFixture<InteractiveMap1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveMap1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractiveMap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
