import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CarList } from '../../services/service.service';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss'],
})
export class ComparePageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'Name',
    'Horsepower',
    'Price',
    'Year',
  ];
  compareList: CarList[] =
    JSON.parse(localStorage.getItem('compareList')!) || [];
  dataSource = new MatTableDataSource<CarList>(this.compareList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
