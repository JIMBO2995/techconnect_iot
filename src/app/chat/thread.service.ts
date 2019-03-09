import { Injectable } from '@angular/core';
import { AngularFirestore, 
         AngularFirestoreCollection, 
         AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { AuthService } from '../core/auth.service';
import { MessageService } from './message.service';
import { Message} from './message.model';
import {Thread} from './thread.model';
import { Router } from '@angular/router';
import { merge } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

threadsCollection: AngularFirestoreCollection<Thread>
threadDoc:  AngularFirestoreDocument<Thread>
messages: Observable<Message[]>
 
constructor( 
            private auth: AuthService,
            private messageService: MessageService,
            private afs: AngularFirestore,
            private router: Router
            ) { }

 getThread(profileId:string){
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    return this.threadDoc.valueChanges();

 }
 getThreads(){
   this.threadsCollection = this.afs.collection('chats', 
                  ref => ref.where(`members.${this.auth.currentUserId}`,"==",true));
   return this.threadsCollection.valueChanges();
 }

saveLastMessage(channelId, message){
 const data = { lastMessage: message };
  return this.afs.doc(`chats/${channelId}`).set( data , {merge: true})
}

 async deleteThread(threadId: string) {
  const batch = this.afs.firestore.batch();
  const query = await this.afs.collection(`chats/${threadId}/messages`).ref.get();
  console.log(query);
  query.forEach(doc => {
    batch.delete(doc.ref);
  });
  batch.commit().then(() => {
    this.afs.doc(`chats/${threadId}`).delete();
  });
}
 


   createThread(profileId) {
    const currentUserId = this.auth.currentUserId;

    const id =
      profileId < currentUserId ? `${profileId}_${currentUserId}` : `${currentUserId}_${profileId}`;
    const avatar = this.auth.authState.photoURL;

    const creator = this.auth.authState.displayName || this.auth.authState.email;
    const lastMessage = null;
    const members = { [profileId]: true, [currentUserId]: true };

    const thread: Thread = { id, avatar, creator, lastMessage,  members };
    const threadPath = `chats/${id}`;

    return this.afs
      .doc(threadPath)
      .set(thread, { merge: true })
      .then(() => this.router.navigate([`chat/${id}`]));
  }

}