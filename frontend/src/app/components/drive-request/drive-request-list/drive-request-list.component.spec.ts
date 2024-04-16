import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveRequestListComponent } from './drive-request-list.component';

describe('DriveRequestListComponent', () => {
  let component: DriveRequestListComponent;
  let fixture: ComponentFixture<DriveRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriveRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
