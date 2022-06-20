import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { MatDialog } from '@angular/material/dialog';
import { ObrazovanjeDialogComponent } from '../../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit, OnDestroy {

  dataSource! : MatTableDataSource<Obrazovanje>;
  displayedColumns = ['id', 'naziv', 'opis', 'stepenStrucneSpreme', 'actions'];
  subscription! : Subscription;

  @ViewChild(MatSort , {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator , {static:false}) paginator!: MatPaginator;

  constructor(private obrazovanjeService: ObrazovanjeService,
              private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.obrazovanjeService.getAllObrazovanje()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    }),
    (error: Error) => {console.log(error.name + " " + error.message)}
  }

  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, stepenStrucneSpreme?: string){
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, {data: {id, naziv, opis, stepenStrucneSpreme}})
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result == 1){
          this.loadData();
        }
     }
    )
  }
  
  public applyFilter(filter:any){
    filter = filter.target.value;
    filter = filter.trim(); //trimujemo tj brisemo sve spejsove izmdju
    filter = filter.toLocaleLowerCase(); //ne moramo da brinemo da li je malo ili veliko slovo
    this.dataSource.filter = filter;
  }

}
