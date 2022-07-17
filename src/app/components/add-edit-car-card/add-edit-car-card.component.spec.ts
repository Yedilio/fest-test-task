import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarCardComponent } from './add-edit-car-card.component';

describe('AddEditCarCardComponent', () => {
  let component: AddEditCarCardComponent;
  let fixture: ComponentFixture<AddEditCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCarCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
