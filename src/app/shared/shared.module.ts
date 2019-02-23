import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MaterialModule} from '../material.module';
import { FromNowPipe } from './from-now.pipe';
import { UploadComponent } from './upload/upload.component';
import { UploadService }    from './upload/upload.service';

@NgModule({
  declarations: [FromNowPipe, UploadComponent],
  exports: [CommonModule,FormsModule,
            MaterialModule,ReactiveFormsModule,
            FromNowPipe, UploadComponent],
  imports: [CommonModule,FormsModule,MaterialModule,ReactiveFormsModule],
  providers:[ UploadService ]
})
export class SharedModule { }
