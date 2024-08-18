import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationInfoComponent } from './operation-info.component';

describe('OperationInfoComponent', () => {
  let component: OperationInfoComponent;
  let fixture: ComponentFixture<OperationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
