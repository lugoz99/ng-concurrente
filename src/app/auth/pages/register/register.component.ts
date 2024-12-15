import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../../interface/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });
  onRegister(): void {
    if (this.registerForm.invalid) {
      this.ShowError('Por favor, completa correctamente el formulario.');
      return;
    }


    const user: UserRegister = {
      email: this.registerForm.value?.email!,
    }

    this.authService.registerUser( user ).subscribe({
      next: (response) => {
        console.log(response);
        this.showSuccess(response.message);  // Mostrar mensaje de éxito
        this.router.navigate(['/auth/login']);  // Redirigir al login
      },
      error: (error:any) =>
        {
          console.error(error),  // Mostrar error en consola
          this.ShowError(error.message)},  // Mostrar error
    });
  }


  showSuccess(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-exito'],


    });
  }

  // Función para mostrar mensajes de error
  ShowError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}
