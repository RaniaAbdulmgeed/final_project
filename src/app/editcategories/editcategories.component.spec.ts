import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoriesComponent } from './editcategories.component';

describe('EditcategoriesComponent', () => {
  let component: EditcategoriesComponent;
  let fixture: ComponentFixture<EditcategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcategoriesComponent]
    });
    fixture = TestBed.createComponent(EditcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
