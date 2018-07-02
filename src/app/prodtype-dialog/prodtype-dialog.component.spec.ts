import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdtypeDialogComponent } from './prodtype-dialog.component';

describe('ProdtypeDialogComponent', () => {
  let component: ProdtypeDialogComponent;
  let fixture: ComponentFixture<ProdtypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdtypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdtypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
