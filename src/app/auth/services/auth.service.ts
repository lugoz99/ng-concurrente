import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterResponse, UserRegister } from '../interface/auth.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly baseUrl: string = environment.baseUrl;
    private http = inject(HttpClient);


  login(credentials: LoginRequest): Observable<LoginResponse> {
    const body = new URLSearchParams();
    body.set('username', credentials.email);
    body.set('password', credentials.security_key);
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  registerUser( user: UserRegister): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error && error.error.detail) {
      console.error(error.error.detail);
      errorMessage = error.error.detail;
    }
    return throwError(() => new Error(errorMessage));
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Método para obtener el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para eliminar el token (logout)
  logout(): void {
    localStorage.removeItem('access_token');
  }
}
