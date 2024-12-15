import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchModule } from './search/search.module';


const routes: Routes = [
  // Ruta para autenticación
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // Ruta para el dashboard
  {
    path: 'dashboard',
    //canActivate: [isAuthenticatedGuard], // Asegúrate de definir esta guardia
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
  },
  // Redirección por defecto
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  // Ruta comodín
  {
    path: '**',
    redirectTo: 'auth'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
