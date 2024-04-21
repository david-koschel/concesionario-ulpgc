import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableVehicleFormComponent } from './configurable-vehicle-form.component';

describe('ConfigurableVehicleFormComponent', () => {
  let component: ConfigurableVehicleFormComponent;
  let fixture: ComponentFixture<ConfigurableVehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurableVehicleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurableVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
