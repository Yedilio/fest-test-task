import { Component, forwardRef, OnInit } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-add-edit-car-card',
  templateUrl: './add-edit-car-card.component.html',
  styleUrls: ['./add-edit-car-card.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddEditCarCardComponent),
      multi: false,
    },
  ],
})
export class AddEditCarCardComponent implements OnInit {
  loading: boolean = true;
  form!: FormGroup;
  _min = moment().year(1985);
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private toast: ToastrService,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((map: any) => {
      console.log('map', map);
      const id = map?.params?.id ? Number(map?.params?.id) : null;
      if (id) {
        this.service
          .getByIdCar(id)
          .pipe(take(1))
          .subscribe((res) => {
            this.createForm(res);
          });
      } else this.createForm();
    });
  }

  createForm(data: any = null) {
    this.form = this.fb.group({
      id: new FormControl(data?.id || null, []),
      Horsepower: new FormControl(data?.Horsepower || null, [
        Validators.required,
      ]),
      Name: new FormControl(data?.Name || null, [Validators.required]),
      Year: new FormControl(
        data?.Year ? moment(data?.Year).format('YYYY') : null,
        [Validators.required]
      ),
    });

    this.loading = false;
  }

  setMonthAndYear(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    this.form.get('Year')?.reset(moment(chosenDate).format('YYYY'));
  }

  submit() {
    const value = this.form.getRawValue();

    if (!value.id) {
      delete value.id;
    }

    if (value?.Name?.length < 3) {
      this.toast.warning('Name field should be at least 3 character!');
      return;
    } else if (value?.Horsepower < 1) {
      this.toast.warning('Horsepower field should be min 1!');
      return;
    }

    const api = value.id
      ? this.service.editCar(value, value.id)
      : this.service.createCar(value);

    api.subscribe(() => {
      this.route.navigate(['/car-shop']).then();
    });
  }
}
