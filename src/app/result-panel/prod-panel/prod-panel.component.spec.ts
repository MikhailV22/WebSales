import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPanelComponent } from './prod-panel.component';

describe('ProdPanelComponent', () => {
  let component: ProdPanelComponent;
  let fixture: ComponentFixture<ProdPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
