import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyCookiesComponent } from './privacy-cookies.component';

describe('PrivacycookiesComponent', () => {
  let component: PrivacyCookiesComponent;
  let fixture: ComponentFixture<PrivacyCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
