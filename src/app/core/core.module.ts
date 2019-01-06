import { NgModule } from '@angular/core';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [ 
             AngularFirestoreModule,
             AngularFireStorageModule,
             AngularFireAuthModule
            ],
  providers: [AuthService]
})
export class CoreModule { }
