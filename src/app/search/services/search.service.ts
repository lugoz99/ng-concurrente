import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Variant, VariantResponse } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);





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


  getAllVariants(lastId: string | null = null, pageSize?: number): Observable<VariantResponse> {
    let params = new HttpParams();

    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }

    if (lastId) {
      params = params.set('start_id', lastId);
    }

    return this.http.get<VariantResponse>(`${this.baseUrl}/variants/all`, { params })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }


}
