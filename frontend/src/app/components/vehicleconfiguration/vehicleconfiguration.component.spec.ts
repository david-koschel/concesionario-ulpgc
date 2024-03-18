import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleconfigurationComponent } from './vehicleconfiguration.component';

describe('VehicleconfigurationComponent', () => {
  let component: VehicleconfigurationComponent;
  let fixture: ComponentFixture<VehicleconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleconfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
