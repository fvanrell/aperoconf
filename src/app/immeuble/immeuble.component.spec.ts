import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmeubleComponent } from './immeuble.component';

describe('ImmeubleComponent', () => {
  let component: ImmeubleComponent;
  let fixture: ComponentFixture<ImmeubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmeubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
