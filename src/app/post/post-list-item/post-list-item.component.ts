import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize} from 'rxjs/operators'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  
  @Input() 
  post: Post ;
  editing = false ;
  imageURL: string;
   downloadURL: Observable<any>; 
   uploadPercent: Observable<number>;

  constructor( private postService: PostService,
               public auth: AuthService,
               private storage: AngularFireStorage  ) { }

  ngOnInit() {
  }

  delete( id: string){
   this.postService.delete(id)
  }
   
   update(){

        const formData = {
        title: this.post.title,
        image: this.imageURL,
        content: this.post.content,
        draft: this.post.draft
       }
       this.postService.update(this.post.id, formData);
       this.editing = false; 
     }

     trending( value: number){
      if(this.post.id){
        this.postService.update( this.post.id, {trending: value + 1})
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
