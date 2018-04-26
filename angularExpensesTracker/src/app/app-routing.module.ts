import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses'
  },
  {
    path: 'login',
    canActivate: [AuthGuardService],
    component: LoginComponent
  },
  {
    path: 'registration',
    canActivate: [AuthGuardService],
    component: RegistrationComponent
  },
  {
    path: 'expenses',
    canActivate: [AuthGuardService],
    component: ExpensesListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

export const appComponents = [
  ExpensesListComponent,
  LoginComponent,
  RegistrationComponent
];


