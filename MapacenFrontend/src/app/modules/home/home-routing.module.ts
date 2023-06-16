import { NgModule } from '@angular/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { RoutesPath } from '@core/enums/routes-path.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: RoutesPath.HOME,
    component: HomeComponent,
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
