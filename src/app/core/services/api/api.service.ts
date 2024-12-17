import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  catchError,
  delay,
  map,
  Observable,
  of,
  retry,
  throwError,
} from 'rxjs';
import { APIResponse, ResultObject } from '../../../models/api-service.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected readonly http = inject(HttpClient);
  private baseUrl: string = `http://localhost:3000`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  // GET Request
  get<T>(endpoint: string, params?: any): Observable<ResultObject | any> {
    try {
      let queryParams = new HttpParams();
      if (params) {
        for (const key in params) {
          queryParams = queryParams.append(key, params[key]);
        }
      }

      return this.http
        .get<APIResponse<T>>(`${this.baseUrl}/${endpoint}`, {
          params: queryParams,
          ...this.httpOptions,
        })
        .pipe(
          retry(2),
          delay(1000),
          catchError(this.handleError),
          map((res: APIResponse<T>) => {
            if (res.success) {
              return res.resultObject;
            }
            return res;
          }),
        );
    } catch (error) {
      return of();
    }
  }

  // POST Request
  post<T>(endpoint: string, data: any): Observable<ResultObject | any> {
    return this.http
      .post<
        APIResponse<T>
      >(`${this.baseUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map((res: APIResponse<T>) => {
          if (res.success) {
            return res;
          }
          return res;
        }),
      );
  }

  // PUT Request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PATCH Request
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE Request
  delete<T>(endpoint: string, params?: any): Observable<ResultObject | any> {
    let queryParams = new HttpParams();
    if (params) {
      for (const key in params) {
        queryParams = queryParams.append(key, params[key]);
      }
    }

    return this.http
      .delete<APIResponse<T>>(`${this.baseUrl}/${endpoint}`, {
        params: queryParams,
        ...this.httpOptions,
      })
      .pipe(
        catchError(this.handleError),
        map((res: APIResponse<T>) => {
          if (res.success) {
            return res.resultObject;
          }
          return res;
        }),
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(
      () =>
        new Error(
          errorMessage ? errorMessage : 'There is an error. Please try again.',
        ),
    );
  }
}
