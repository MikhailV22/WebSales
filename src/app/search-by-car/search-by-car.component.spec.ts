import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCarComponent } from './search-by-car.component';

describe('SearchByCarComponent', () => {
  let component: SearchByCarComponent;
  let fixture: ComponentFixture<SearchByCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
