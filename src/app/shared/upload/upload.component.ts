import { Component, OnInit, Input } from '@angular/core';
import { UploadService} from './upload.service'
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() path ;
  @Input() meta ;
  @Input() uploadType ; 
  selection: FileList; 
  constructor( private uploadService: UploadService)  { }

  ngOnInit() {
    
  }

  detect(event){
    this.selection = event.target.files;
    console.log(this.selection); 
  }

  upload(){
    const file = this.selection[0];
    if(file.type.split('/')[0] == 'image'){
      this.uploadService.uploadTask(this.path, file, this.meta, this.uploadType)
     } else {
       console.log(" error image only")
     }
   }

}
