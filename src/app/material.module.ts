import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, 
            MatToolbarModule, MatSlideToggleModule, MatProgressBarModule,
            MatGridListModule ],
  exports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
            MatToolbarModule, MatSlideToggleModule, MatProgressBarModule,
            MatGridListModule ]
})
export class MaterialModule { }
