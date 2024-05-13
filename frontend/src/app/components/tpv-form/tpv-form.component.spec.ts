import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpvFormComponent } from './tpv-form.component';

describe('TpvFormComponent', () => {
  let component: TpvFormComponent;
  let fixture: ComponentFixture<TpvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpvFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
