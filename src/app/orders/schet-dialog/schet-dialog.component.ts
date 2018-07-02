import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-schet-dialog',
  templateUrl: './schet-dialog.component.html',
  styleUrls: ['./schet-dialog.component.css']
})
export class SchetDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SchetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onYesClick(): void {
    this.dialogRef.close(this.data.email);
  }
}
