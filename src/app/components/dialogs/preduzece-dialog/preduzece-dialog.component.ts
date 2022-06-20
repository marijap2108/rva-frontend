import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag!: number;

  constructor(private snackBar: MatSnackBar, //mali prozorcic potvrde
              public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Preduzece, //pomocu ovoga se uzimaju podaci iz forme
              private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
  }

  public add(){
    this.preduzeceService.addPreduzece(this.data).subscribe(
      data => {
        this.snackBar.open("Preduzece je uspesno dodato.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                      this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public update(){
    this.preduzeceService.updatePreduzece(this.data).subscribe(
      data => {
        this.snackBar.open("Preduzece je uspesno modifikovano.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                    this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public delete(){
    this.preduzeceService.deletePreduzece(this.data.id).subscribe(
      data => {
        this.snackBar.open("Preduzece je uspesno obrisano.", "Ok", {duration: 3500})
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