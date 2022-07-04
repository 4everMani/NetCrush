import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prime-activate',
  templateUrl: './prime-activate.component.html',
  styleUrls: ['./prime-activate.component.scss']
})
export class PrimeActivateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrimeActivateComponent>) { }

  ngOnInit(): void {
  }

  public onAccept(): void{
    this.dialogRef.close(true);
  }

  public onCancel(): void{
    this.dialogRef.close(false);
  }

}
