import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigInfoComponent } from './rig-info.component';

describe('RigInfoComponent', () => {
  let component: RigInfoComponent;
  let fixture: ComponentFixture<RigInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RigInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RigInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
