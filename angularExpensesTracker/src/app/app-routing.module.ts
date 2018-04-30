import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'expenses'
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
          },
          {
            path: 'users',
            canActivate: [AuthGuardService],
            component: UsersListComponent,
            data: { expectedRole: 'admin' }
          },
          {
            path: 'users/:id',
            canActivate: [AuthGuardService],
            component: UserDetailsComponent,
            data: { expectedRole: 'admin' }
          },
          {
            path: 'users/:id/expenses',
            canActivate: [AuthGuardService],
            component: ExpensesListComponent
          }
        ]
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
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

export const appComponents = [
  DashboardComponent,
  ExpenseDetailsComponent,
  ExpensesListComponent,
  LoginComponent,
  RegistrationComponent,
  UserDetailsComponent,
  UsersListComponent
];


