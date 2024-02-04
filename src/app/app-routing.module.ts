import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'offers', loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersModule), canActivate: [AuthGuard]},
  { path: 'review', loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewModule), canActivate: [AuthGuard]},
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: "**", redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
