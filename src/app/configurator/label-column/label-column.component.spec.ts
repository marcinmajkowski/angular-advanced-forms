import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelColumnComponent } from './label-column.component';

describe('LabelColumnComponent', () => {
  let component: LabelColumnComponent;
  let fixture: ComponentFixture<LabelColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
