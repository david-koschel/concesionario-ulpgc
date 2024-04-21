import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDriveCarListComponent } from './test-drive-car-list.component';

describe('TestDriveCarListComponent', () => {
  let component: TestDriveCarListComponent;
  let fixture: ComponentFixture<TestDriveCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDriveCarListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDriveCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
