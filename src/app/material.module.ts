import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, 
            MatToolbarModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
            MatToolbarModule, MatSlideToggleModule]
})
export class MaterialModule { }
