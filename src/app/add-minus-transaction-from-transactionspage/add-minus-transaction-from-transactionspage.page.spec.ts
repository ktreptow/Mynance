import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinusTransactionFromTransactionspagePage } from './add-minus-transaction-from-transactionspage.page';

describe('AddMinusTransactionFromTransactionspagePage', () => {
  let component: AddMinusTransactionFromTransactionspagePage;
  let fixture: ComponentFixture<AddMinusTransactionFromTransactionspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMinusTransactionFromTransactionspagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinusTransactionFromTransactionspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
