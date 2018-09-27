import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionFromTransactionspagePage } from './add-transaction-from-transactionspage.page';

describe('AddTransactionFromTransactionspagePage', () => {
  let component: AddTransactionFromTransactionspagePage;
  let fixture: ComponentFixture<AddTransactionFromTransactionspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionFromTransactionspagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionFromTransactionspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
