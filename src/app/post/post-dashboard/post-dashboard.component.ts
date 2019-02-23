import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { PostService } from '../post.service';
import { Post} from '../post.model';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs'
import { finalize }  from 'rxjs/operators'


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  @ViewChild('resetMe')
  inputField: any ;
  postForm: FormGroup; 
   imageURL: string;
   downloadURL: Observable<any>; 
   uploadPercent: Observable<number>;
   
  constructor( private postService: PostService,
               private auth: AuthService,
               private fb: FormBuilder,
               private storage: AngularFireStorage ) { }

  ngOnInit() {
    this.createForm()
  }
  
  createForm(){
    this.postForm = this.fb.group( 
      {
         title: [''],
         content: [''],
         draft: false
      })
  }
  
    async savePost( data: Post){
    const user = await this.auth.authState;
    console.log(user);
    const formData : Post = {
      author: this.auth.authState.displayName || this.auth.authState.email ,
      authorId: this.auth.currentUserId,
      title: this.postForm.get('title').value,
      image: this.imageURL || null ,
      content: this.postForm.get('content').value,
      draft: this.postForm.get('draft').value ||false,
      published: new Date(),
      trending: 0  
    }
    if(!this.postForm.untouched){
    this.postService.create( formData );
     this.postForm.reset();
    this.imageURL = '';
    this.inputField.nativeElement.value = '';
    }
    
  }

  uploadPostImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);

     
      const ref = this.storage.ref(path);
       this.uploadPercent = task.percentageChanges();
     
         
      task.snapshotChanges().pipe(
        finalize(() => 
        {this.downloadURL = ref.getDownloadURL()
         this.downloadURL.subscribe(url => (this.imageURL = url))
        })
     ).subscribe()
       
    }
  }
}
