import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag!: number;

  constructor(private snackBar: MatSnackBar, //mali prozorcic potvrde
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje, //pomocu ovoga se uzimaju podaci iz forme
              private obrazovanjeService: ObrazovanjeService) { }

  ngOnInit(): void {
  }

  public add(){
    this.obrazovanjeService.addObrazovanje(this.data).subscribe(
      data => {
        this.snackBar.open("Obrazovanje je uspesno dodato.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                      this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public update(){
    this.obrazovanjeService.updateObrazovanje(this.data).subscribe(
      data => {
        this.snackBar.open("Obrazovanje je uspesno modifikovano.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                    this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public delete(){
    this.obrazovanjeService.deleteObrazovanje(this.data.id).subscribe(
      data => {
        this.snackBar.open("Obrazovanje je uspesno obrisano.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                      this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmena", "Ok", {duration: 3500})
  }

}
