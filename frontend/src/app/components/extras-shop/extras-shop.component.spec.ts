import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasShopComponent } from './extras-shop.component';

describe('ExtrasShopComponent', () => {
  let component: ExtrasShopComponent;
  let fixture: ComponentFixture<ExtrasShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtrasShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtrasShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
