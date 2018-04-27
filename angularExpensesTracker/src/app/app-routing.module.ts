import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/auth-guard.service';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

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
  },
  {
    path: 'expenses/:id',
    canActivate: [AuthGuardService],
    component: ExpenseDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

export const appComponents = [
  ExpenseDetailsComponent,
  ExpensesListComponent,
  LoginComponent,
  RegistrationComponent
];


