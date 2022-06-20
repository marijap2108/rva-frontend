import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { Sektor } from 'src/app/models/sektor';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  public flag!: number;
  preduzeca!: Preduzece[];

  constructor(private snackBar: MatSnackBar, //mali prozorcic potvrde
              public dialogRef: MatDialogRef<SektorDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Sektor, //pomocu ovoga se uzimaju podaci iz forme
              private sektorService: SektorService, 
              private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.preduzeceService.getAllPreduzece().subscribe(
      preduzeca => {
        this.preduzeca = preduzeca;
      }
    )
  }

  compare(a:Sektor, b:Sektor | undefined){
    return a.id == b?.id;
  }

  public add(){
    this.sektorService.addSektor(this.data).subscribe(
      data => {
        this.snackBar.open("Sektor je uspesno dodat.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                      this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public update(){
    this.sektorService.updateSektor(this.data).subscribe(
      data => {
        this.snackBar.open("Sektor je uspesno modifikovan.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                    this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public delete(){
    this.sektorService.deleteSektor(this.data.id).subscribe(
      data => {
        this.snackBar.open("Sektor je uspesno obrisan.", "Ok", {duration: 3500})
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
