import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinusTransactionsPage } from './add-minus-transactions.page';

describe('AddMinusTransactionsPage', () => {
  let component: AddMinusTransactionsPage;
  let fixture: ComponentFixture<AddMinusTransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMinusTransactionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinusTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
