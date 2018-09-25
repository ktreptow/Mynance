import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingsplanPage } from './add-savingsplan.page';

describe('AddSavingsplanPage', () => {
  let component: AddSavingsplanPage;
  let fixture: ComponentFixture<AddSavingsplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSavingsplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSavingsplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
