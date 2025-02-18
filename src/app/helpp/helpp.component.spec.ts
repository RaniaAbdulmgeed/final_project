import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelppComponent } from './helpp.component';

describe('HelppComponent', () => {
  let component: HelppComponent;
  let fixture: ComponentFixture<HelppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelppComponent]
    });
    fixture = TestBed.createComponent(HelppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
