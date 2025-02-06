import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductFormComponent } from './custom-product-form.component';

describe('CustomProductFormComponent', () => {
  let component: CustomProductFormComponent;
  let fixture: ComponentFixture<CustomProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomProductFormComponent]
    });
    fixture = TestBed.createComponent(CustomProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
