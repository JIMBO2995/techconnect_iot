import { Injectable } from '@angular/core';
import { AngularFirestore, 
         AngularFirestoreCollection, 
          AngularFirestoreDocument } from 'angularfire2/firestore'
import { Post } from './post.model';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection : AngularFirestoreCollection<Post>;
  postDoc : AngularFirestoreDocument<Post>;


  constructor( private afs: AngularFirestore) {
    this.postCollection = afs.collection( 'posts', 
                          ref => ref.orderBy( 'trending', 'desc' ).limit(10)
          )
   }

   create( data: Post){
     return this.postCollection.add(data);
   };

   getPosts() : Observable<Post[]>{
     return  this.postCollection.snapshotChanges().pipe(
      map(actions =>
         { return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
     })
    )};

    getPost(id:string){
     return this.afs.doc<Post>(`posts/${id}`);
      }

    getPostData(id:string){
      this.postDoc = this.afs.doc<Post>(`posts/${id}`);
      return this.postDoc.valueChanges();
    }

    delete( id: string){
      return this.getPost(id).delete();
    }

    update(id: string, formData){
      return this.getPost(id).update(formData)
    }
   
}
