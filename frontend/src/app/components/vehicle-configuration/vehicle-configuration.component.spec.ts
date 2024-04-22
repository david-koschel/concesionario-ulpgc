import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VehicleConfigurationComponent} from './vehicle-configuration.component';

describe('VehicleconfigurationComponent', () => {
  let component: VehicleConfigurationComponent;
  let fixture: ComponentFixture<VehicleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
