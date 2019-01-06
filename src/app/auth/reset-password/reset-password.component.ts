import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string
  constructor( private auth: AuthService, private router: Router  ) { }

  ngOnInit() {
  }
 resetPassword(email){
   return this.auth.resetPassword(this.email)
         .then( () => this.router.navigate( ["/signin"]))
 }
}
