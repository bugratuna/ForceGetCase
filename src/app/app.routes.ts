import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ROUTING_PATH } from './app-routing-path.const';
import { AuthService } from './core/services/auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { OfferComponent } from './pages/offer/offer.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OfferListComponent } from './pages/offer-list/offer-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const authService = inject(AuthService);
      if (authService.isAuthenticated()) {
        return ROUTING_PATH.OFFER;
      }
      return ROUTING_PATH.LOGIN;
    },
    pathMatch: 'full',
  },
  {
    path: ROUTING_PATH.LOGIN,
    component: LoginComponent,
  },
  {
    path: ROUTING_PATH.OFFER,
    component: OfferComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTING_PATH.OFFER_LIST,
    component: OfferListComponent,
    canActivate: [AuthGuard],
  },
];
