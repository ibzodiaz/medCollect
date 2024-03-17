import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SlayoutComponent } from './slayout/slayout.component';
import { IndexComponent } from './index/index.component';
import { ShareFilesComponent } from './share-files/share-files.component';
import { FileCategoriesComponent } from './file-categories/file-categories.component';
import { FormsModule } from '@angular/forms';
import { ParametresComponent } from './parametres/parametres.component';
import { HospitalOperationsComponent } from './hospital-operations/hospital-operations.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { PasswordComponent } from './parametres/password/password.component';
import { UpdateComponent } from './parametres/update/update.component';
import { PasswordUserComponent } from './users/password-user/password-user.component';


@NgModule({
  declarations: [
    SlayoutComponent,
    IndexComponent,
    ShareFilesComponent,
    FileCategoriesComponent,
    ParametresComponent,
    HospitalOperationsComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    PasswordComponent,
    UpdateComponent,
    PasswordUserComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule
  ]
})
export class SuperAdminModule { }
