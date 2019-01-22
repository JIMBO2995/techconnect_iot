import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes} from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import {PostModule} from "../post/post.module"


const routes: Routes = [
  { path: 'me', component: UserDashboardComponent, data: { title: 'Dashboard'} },
  { path: 'users', component: UserListComponent, data: { title: 'Users'} },
  { path: 'users/:id', component: UserDetailComponent, data: { title: 'Profile'} }
] 
@NgModule({
  declarations: [UserDashboardComponent, UserDetailComponent, UserListComponent, UserListItemComponent],
  imports: [
    SharedModule,
    PostModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UserListItemComponent,
    UserDetailComponent
  ]
})
export class UserModule { }
