import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getCarsList(q: string = ''): Observable<any> {
    return this.http
      .get('http://localhost:3000/cars' + (q ? '?q=' + q : ''), {})
      .pipe(catchError(this.handleError));
  }

  getByIdCar(car_id: number): Observable<any> {
    return this.http
      .get('http://localhost:3000/cars/' + car_id, {})
      .pipe(catchError(this.handleError));
  }

  createCar(value: any): Observable<any> {
    return this.http
      .post('http://localhost:3000/cars', value)
      .pipe(catchError(this.handleError));
  }

  editCar(value: any, car_id: number): Observable<any> {
    return this.http
      .put('http://localhost:3000/cars/' + car_id, value, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  deleteCar(car_id: number): Observable<any> {
    return this.http
      .delete('http://localhost:3000/cars/' + car_id, {})
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError('An error occurred: ' + error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      return throwError(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export interface CarList {
  Name: string;
  Horsepower: number;
  Year: string;
  symbol: string;

  Acceleration?: number;
  Currency?: string;
  Cylinders?: number;
  Displacement?: number;
  Miles_per_Gallon?: number;
  Origin?: string;
  photoPath?: string;
  Price?: number;
  Weight_in_lbs?: number;
  id?: number;
}
