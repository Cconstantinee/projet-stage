import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTableComponent } from './filter-table.component';

describe('FilterTableComponent', () => {
  let component: FilterTableComponent;
  let fixture: ComponentFixture<FilterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
