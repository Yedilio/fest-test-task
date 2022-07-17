import { Component, OnInit } from '@angular/core';
import { CarList, ServiceService } from '../../services/service.service';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cars-card',
  templateUrl: './cars-card.component.html',
  styleUrls: ['./cars-card.component.scss'],
})
export class CarsCardComponent implements OnInit {
  cars$!: Observable<CarList[]>;
  reload$ = new BehaviorSubject<string>('');
  compareListCar: CarList[] = [];

  constructor(
    private service: ServiceService,
    private matDialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('compareList');

    this.cars$ = this.reload$.pipe(
      switchMap((q) => this.service.getCarsList(q))
    );
  }

  addToCompare(car: any) {
    const index = this.compareListCar.findIndex((el) => el.id === car.id);

    if (index > -1) {
      this.toast.warning('A car already added to compare list!');
      return;
    } else {
      this.compareListCar.push(car);
      localStorage.removeItem('compareList');
      localStorage.setItem('compareList', JSON.stringify(this.compareListCar));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reload$.next(filterValue);
  }

  openDelete(car: any) {
    this.matDialog
      .open(DeleteModalComponent, {
        width: '300px',
        height: '200px',
        data: car,
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.service
            .deleteCar(car.id)
            .pipe(take(1))
            .subscribe(() => {
              this.reload$.next('');
              this.toast.success('Success');
            });
        }
      });
  }
}
