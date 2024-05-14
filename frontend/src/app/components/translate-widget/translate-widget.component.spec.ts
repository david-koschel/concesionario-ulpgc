import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateWidgetComponent } from './translate-widget.component';

describe('TranslateWidgetComponent', () => {
  let component: TranslateWidgetComponent;
  let fixture: ComponentFixture<TranslateWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
