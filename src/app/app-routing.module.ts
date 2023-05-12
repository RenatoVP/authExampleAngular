import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';
import { SignupComponent } from './components/usuario/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'usuario/login',
        component: LoginComponent
    },
    {
        path: 'usuario/signup',
        component: SignupComponent
    },
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
