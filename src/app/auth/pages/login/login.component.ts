import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponse, LoginRequest } from '../../interface/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Crear el formulario reactivo con los campos y validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo obligatorio y formato email
      password: ['', [Validators.required, Validators.minLength(4)]], // Campo obligatorio, mínimo 4 caracteres
    });
  }

  mostrarNotificacionExito() {
    this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackbar-exito'
    });
  }

  // Mensaje de error
  mostrarNotificacionError() {
    this.snackBar.open('Error al iniciar sesión: Credenciales incorrectas', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-error'
    });
  }

  onSubmit(): void {
    // Obtener los valores del formulario
    // Llamar al servicio de autenticación
    const login: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      security_key: this.loginForm.get('password')?.value
    };

    this.authService.login(login).subscribe({
      next: (resp: LoginResponse) => {
        // Guardar el token en el almacenamiento local
        this.authService.saveToken(resp.access_token);
        this.mostrarNotificacionExito();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.mostrarNotificacionError();
        console.error(err);
      }
    });



  }
}
