import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from './pages/layout-auth/layout-auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección inicial
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
