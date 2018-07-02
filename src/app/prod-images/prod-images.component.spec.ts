import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdImagesComponent } from './prod-images.component';

describe('ProdImagesComponent', () => {
  let component: ProdImagesComponent;
  let fixture: ComponentFixture<ProdImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
