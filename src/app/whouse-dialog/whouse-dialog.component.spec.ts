import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhouseDialogComponent } from './whouse-dialog.component';

describe('WhouseDialogComponent', () => {
  let component: WhouseDialogComponent;
  let fixture: ComponentFixture<WhouseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhouseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
