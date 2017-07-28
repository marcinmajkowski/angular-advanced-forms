import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConfiguratorComponent } from './offer-configurator.component';

describe('OfferConfiguratorComponent', () => {
  let component: OfferConfiguratorComponent;
  let fixture: ComponentFixture<OfferConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
