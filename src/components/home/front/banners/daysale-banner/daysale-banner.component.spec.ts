import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysaleBannerComponent } from './daysale-banner.component';

describe('DaysaleBannerComponent', () => {
  let component: DaysaleBannerComponent;
  let fixture: ComponentFixture<DaysaleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysaleBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysaleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
