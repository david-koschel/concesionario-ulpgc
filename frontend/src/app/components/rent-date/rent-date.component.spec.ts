import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDateComponent } from './rent-date.component';

describe('RentalDateComponent', () => {
  let component: RentalDateComponent;
  let fixture: ComponentFixture<RentalDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
