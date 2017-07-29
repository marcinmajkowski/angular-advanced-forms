import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsCardComponent } from './labels-card.component';

describe('LabelsCardComponent', () => {
  let component: LabelsCardComponent;
  let fixture: ComponentFixture<LabelsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
