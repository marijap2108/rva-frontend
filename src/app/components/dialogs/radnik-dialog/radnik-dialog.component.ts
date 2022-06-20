import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { RadnikService } from 'src/app/services/radnik.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  public flag!: number;
  obrazovanja!: Obrazovanje[];

  constructor(private snackBar: MatSnackBar, //mali prozorcic potvrde
              public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Radnik, //pomocu ovoga se uzimaju podaci iz forme
              private radnikService: RadnikService, 
              private obrazovanjeService: ObrazovanjeService) { }

  ngOnInit(): void {
    this.obrazovanjeService.getAllObrazovanje().subscribe(
      obrazovanja => {
        this.obrazovanja = obrazovanja;
      }
    )
  }

  compare(a:Radnik, b:Radnik | undefined){
    return a.id == b?.id;
  }

  public add(){
    this.radnikService.addRadnik(this.data).subscribe(
      data => {
        this.snackBar.open("Radnik je uspesno dodat.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                      this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public update(){
    this.radnikService.updateRadnik(this.data).subscribe(
      data => {
        this.snackBar.open("Radnik je uspesno modifikovan.", "Ok", {duration: 3500})
      }
    ),
    (error: Error) => {console.log(error.name + " " + error.message)
                    this.snackBar.open("Dogodila se greska!", "Ok", {duration: 3500})}
  }

  public delete(){
    this.radnikService.deleteRadnik(this.data.id).subscribe(
      data => {
        this.snackBar.open("Radnik je uspesno obrisan.", "Ok", {duration: 3500})
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
