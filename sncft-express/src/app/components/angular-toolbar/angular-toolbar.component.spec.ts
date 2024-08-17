import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularToolbarComponent } from './angular-toolbar.component';

describe('AngularToolbarComponent', () => {
  let component: AngularToolbarComponent;
  let fixture: ComponentFixture<AngularToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
