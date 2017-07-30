import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantLabelsComponent } from './variant-labels.component';

describe('VariantLabelsComponent', () => {
  let component: VariantLabelsComponent;
  let fixture: ComponentFixture<VariantLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
