import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpaymentsComponent } from './editpayments.component';

describe('EditpaymentsComponent', () => {
  let component: EditpaymentsComponent;
  let fixture: ComponentFixture<EditpaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpaymentsComponent]
    });
    fixture = TestBed.createComponent(EditpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
