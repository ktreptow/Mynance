import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAddPage } from './plans-add.page';

describe('PlansAddPage', () => {
  let component: PlansAddPage;
  let fixture: ComponentFixture<PlansAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
