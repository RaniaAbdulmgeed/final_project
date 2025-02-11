import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecategoryComponent } from './createcategory.component';

describe('CreatecategoryComponent', () => {
  let component: CreatecategoryComponent;
  let fixture: ComponentFixture<CreatecategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecategoryComponent]
    });
    fixture = TestBed.createComponent(CreatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
