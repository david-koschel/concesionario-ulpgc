import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAdminCreateVehicleComponent } from './rent-admin-create-vehicle.component';

describe('RentAdminCreateVehicleComponent', () => {
  let component: RentAdminCreateVehicleComponent;
  let fixture: ComponentFixture<RentAdminCreateVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentAdminCreateVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentAdminCreateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
