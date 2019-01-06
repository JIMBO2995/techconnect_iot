import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MaterialModule} from '../material.module'

@NgModule({
  declarations: [],
  exports: [CommonModule,FormsModule,MaterialModule,ReactiveFormsModule],
  imports: [CommonModule,FormsModule,MaterialModule,ReactiveFormsModule]
})
export class SharedModule { }
