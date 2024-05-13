import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAdminComponent } from './rent-admin.component';

describe('RentAdminComponent', () => {
  let component: RentAdminComponent;
  let fixture: ComponentFixture<RentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
