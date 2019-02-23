import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { Observable} from 'rxjs';
import {finalize} from 'rxjs/operators'
import { Md5 } from 'ts-md5';
import { AngularFireStorage } from 'angularfire2/storage';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  downloadURL: Observable<string>;
  uploads: AngularFirestoreCollection<any> ;
  data: any;

  constructor( private afs: AngularFirestore,
               private storage: AngularFireStorage) { }

  uploadTask( path, file, meta, uploadType){
   const nameHash = Md5.hashStr(file.name + new Date().getTime);
   const fileExt = file.name.split('/')[1];
   const name = `${nameHash}.${fileExt}`;
   const ref = this.storage.ref(`${path}/${name}`);
   const task = ref.put( file, {customMetadata:meta} );
   
   task.snapshotChanges().pipe(
    finalize(() => 
    {
      this.downloadURL = ref.getDownloadURL();
      this.downloadURL.subscribe( url => {
       this.data = {name, url};
       if(uploadType === true){
       this.afs.collection(path).add(this.data)
       console.log(" Image Uploaded to collection");
      } else {
        this.afs.doc(path).update({url});
      }
    })})).subscribe();
     
    // //Save as Collection 
    // if ( uploadType === true ){
    // this.uploads = this.afs.collection(path);
    //   console.log( " Save Collection ")
    //   this.downloadURL = ref.getDownloadURL();
    //   this.downloadURL.subscribe(url => {
    //     const data = { name, url };
    //     this.uploads.add(data);
    //   })} else {
    //     // saves as document field
    //     this.downloadURL.subscribe(url => {
    //       this.afs.doc(path).update({ url });
    //     });
    //   }
    
    }
}
