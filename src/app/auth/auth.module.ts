import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes =[
  { path:'signin', component: SigninComponent, data:{ title: 'signin'} },
  { path:'signup', component: SignupComponent, data:{ title: 'signup'} },
  { path:'reset-password', component: ResetPasswordComponent, data:{ title: 'reset password'} }
] 
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [SignupComponent, SigninComponent, ResetPasswordComponent],
})

export class AuthModule { }
