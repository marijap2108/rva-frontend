import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { Sektor } from 'src/app/models/sektor';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges {

  dataSource!: MatTableDataSource<Radnik>;
  displayedColumns = ['id', 'brojLk', 'ime', 'prezime', 'obrazovanje', 'sektor', 'actions'];
  subscription!: Subscription;
  @Input() selectedSektorBottom!: Sektor;

  constructor(private radnikService: RadnikService,
              private dialog: MatDialog) { }
              
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.radnikService.getRadnikBySektor(this.selectedSektorBottom.id).subscribe
    (data => {
      this.dataSource = new MatTableDataSource(data)
    }),
    (error: Error) => {console.log(error.name + " " + error.message)}
  }

  public openDialog(flag: number, id?: number, brojLk?: string, ime?: string, prezime?: string, obrazovanje?: Obrazovanje, sektor?: Sektor){
    const dialogRef = this.dialog.open(RadnikDialogComponent, {data: {id, brojLk, ime, prezime, obrazovanje, sektor}})
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result == 1){
          this.loadData();
        }
     }
    )
  }

}
