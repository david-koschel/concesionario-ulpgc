import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveRequestFormComponent } from './drive-request-form.component';

describe('DriveRequestFormComponent', () => {
  let component: DriveRequestFormComponent;
  let fixture: ComponentFixture<DriveRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriveRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriveRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
