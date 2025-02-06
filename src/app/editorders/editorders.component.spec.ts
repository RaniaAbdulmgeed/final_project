import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditordersComponent } from './editorders.component';

describe('EditordersComponent', () => {
  let component: EditordersComponent;
  let fixture: ComponentFixture<EditordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditordersComponent]
    });
    fixture = TestBed.createComponent(EditordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
