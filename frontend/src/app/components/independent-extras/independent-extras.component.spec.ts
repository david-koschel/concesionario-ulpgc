import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentExtrasComponent } from './independent-extras.component';

describe('IndependentExtrasComponent', () => {
  let component: IndependentExtrasComponent;
  let fixture: ComponentFixture<IndependentExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndependentExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndependentExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
