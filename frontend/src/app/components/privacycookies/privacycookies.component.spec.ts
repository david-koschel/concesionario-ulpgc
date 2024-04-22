import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacycookiesComponent } from './privacycookies.component';

describe('PrivacycookiesComponent', () => {
  let component: PrivacycookiesComponent;
  let fixture: ComponentFixture<PrivacycookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacycookiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacycookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
