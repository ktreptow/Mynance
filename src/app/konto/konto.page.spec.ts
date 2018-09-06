import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoPage } from './konto.page';

describe('KontoPage', () => {
  let component: KontoPage;
  let fixture: ComponentFixture<KontoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
