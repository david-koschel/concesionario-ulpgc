import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentVehiclePriceComponent } from './rent-vehicle-price.component';

describe('RentVehiclePriceComponent', () => {
  let component: RentVehiclePriceComponent;
  let fixture: ComponentFixture<RentVehiclePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentVehiclePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentVehiclePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
