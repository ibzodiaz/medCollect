import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './_utils/error/error.component';
import { authGuard } from './_helpers/auth.guard';
import { authSuperAdmin } from './_helpers/auth.superAdmin';

const routes: Routes = [
  {
    path:'',loadChildren: () => import('./public/public.module')
                                .then(m => m.PublicModule)
  },
  {
    path:'admin', loadChildren: () => import('./admin/admin.module')
                                .then(m => m.AdminModule), canActivate:[authGuard]
  },
  {
    path:'superadmin', loadChildren: () => import('./super-admin/super-admin.module')
                                .then(m => m.SuperAdminModule), canActivate:[authSuperAdmin]
  },
  {
    path:'auth', loadChildren: () => import('./auth/auth.module')
                                .then(m => m.AuthModule)
  },
  {
    path:'**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
