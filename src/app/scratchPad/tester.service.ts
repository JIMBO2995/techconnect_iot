import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService} from '../core/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TesterService {

  imagesCollection: AngularFirestoreCollection<any>;

  constructor( private auth: AuthService, private afs: AngularFirestore) {   }

getImages(){
  const uid = this.auth.currentUserId;
 this.imagesCollection = this.afs.collection(`users/${uid}/gallery`);
  return  this.imagesCollection.snapshotChanges()
          .pipe(
           map( action => {
             return  action.map( a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data}
              })
             })
            )}

}
 
