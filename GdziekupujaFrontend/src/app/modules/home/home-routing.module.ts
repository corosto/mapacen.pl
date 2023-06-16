import { NgModule } from '@angular/core';
import { AuthAdminGuard } from '@app/auth/auth-admin.guard';
import { AuthOfferGuard } from '@app/auth/auth-offer.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { RoutesPath } from '@core/enums/routes-path.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: RoutesPath.ADMIN_PANEL,
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthAdminGuard],
  },
  {
    path: RoutesPath.ADD_OFFER,
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthOfferGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
