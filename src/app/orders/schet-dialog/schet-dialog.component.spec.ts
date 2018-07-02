import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchetDialogComponent } from './schet-dialog.component';

describe('SchetDialogComponent', () => {
  let component: SchetDialogComponent;
  let fixture: ComponentFixture<SchetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
