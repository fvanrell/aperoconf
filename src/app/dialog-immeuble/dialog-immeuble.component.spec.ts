import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImmeubleComponent } from './dialog-immeuble.component';

describe('DialogImmeubleComponent', () => {
  let component: DialogImmeubleComponent;
  let fixture: ComponentFixture<DialogImmeubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImmeubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImmeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
