import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueVehiclesComponent } from './catalogue-vehicles.component';

describe('CatalogueVehiclesComponent', () => {
  let component: CatalogueVehiclesComponent;
  let fixture: ComponentFixture<CatalogueVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogueVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
