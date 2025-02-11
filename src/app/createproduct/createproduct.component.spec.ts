import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductComponent } from './createproduct.component';

describe('CreateproductComponent', () => {
  let component: CreateproductComponent;
  let fixture: ComponentFixture<CreateproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateproductComponent]
    });
    fixture = TestBed.createComponent(CreateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
