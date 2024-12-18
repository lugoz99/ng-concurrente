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
    return throwError(() => new Error(errorMessage));
  }
  getAllVariants(lastId: string | null = null, pageSize: number): Observable<VariantResponse> {
    let params = new HttpParams();

    // Limpieza del valor de pageSize para evitar caracteres inválidos
    const cleanPageSize = parseInt(pageSize.toString().replace(/[^0-9]/g, ''), 20);

    if (isNaN(cleanPageSize) || cleanPageSize <= 0) {
      console.error('Invalid pageSize value after cleaning:', pageSize);
      return throwError(() => new Error(`Invalid pageSize: '${pageSize}' could not be converted to a valid integer.`));
    }

    // Agregar parámetros a la consulta
    params = params.set('page_size', cleanPageSize.toString()); // Asegurarse de que sea un número limpio en formato string

    if (lastId) {
      params = params.set('start_id', lastId.trim()); // Agregar el ID inicial si existe
    }

    // Realizar la solicitud HTTP
    return this.http.get<VariantResponse>(`${this.baseUrl}/genoma/variants/all`, { params }).pipe(
      catchError((error) => {
        console.error('Error in getAllVariants:', error);
        return throwError(() => new Error('Error fetching variants from the backend.'));
      })
    );
  }

  getBulkVariants(
    field: string,
    value: string,
    startAfter: string | null = null,
    pageSize: number
  ): Observable<VariantResponse> {
    let params = new HttpParams();

    // Limpieza y validación del tamaño de página
    const cleanPageSize = parseInt(pageSize.toString().replace(/[^0-9]/g, ''), 20);


    // Configuración de los parámetros requeridos
    params = params.set('field', field); // Campo de filtro
    params = params.set('value', value); // Valor del filtro
    params = params.set('page_size', cleanPageSize); // Tamaño de la página

    // Establecer el ID de inicio (startAfter se usa como last_id)
    if (startAfter) {
      params = params.set('start_after', startAfter.trim());
    }

    // Realizar la solicitud HTTP al backend
    return this.http.get<VariantResponse>(`${this.baseUrl}/genoma/variants/bulk`, { params }).pipe(
      catchError((error) => {
        console.error('Error in getBulkVariants:', error);
        return throwError(() => new Error('Error fetching bulk variants from the backend.'));
      })
    );
  }

}
