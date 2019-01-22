import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2'
import { CoreModule } from './core/core.module';
import {MaterialModule} from './material.module';
import { RoutingModule } from './routing.module';

import { environment } from 'src/environments/environment';
import { PostModule } from './post/post.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    CoreModule,
    RoutingModule,
    PostModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
