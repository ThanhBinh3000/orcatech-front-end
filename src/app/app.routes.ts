import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {HomeComponent} from './pages/home/home.component';
import {NotAuthenComponent} from './pages/not-authen/not-authen.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/system/login/login.component';
import {RegisterComponent} from './pages/system/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {
        path: 'system',
        children: [
          {path: 'login', component: LoginComponent},
        ]
      },
    ],
  },
  {path: '401', component: NotAuthenComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full',},
];
