import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Variant, VariantResponse } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);





  getAllVariants(page: number = 1, pageSize: number = 100): Observable<VariantResponse> {
    return this.http.get<VariantResponse>(`${this.baseUrl}/variants/all?page=${page}&page_size=${pageSize}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
