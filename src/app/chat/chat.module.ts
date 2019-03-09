import { NgModule } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatFeedComponent } from './chat-feed/chat-feed.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';

 
const routes: Routes = [
      { path:'chat' , component: ChatListComponent },
      { path: 'chat/:id', component: ChatDetailComponent}
]

@NgModule({
  declarations: [ 
    ChatListComponent, 
    ChatDetailComponent, 
    ChatInputComponent, 
    ChatFeedComponent, 
    ChatMessageComponent, 
    ChatMessagesComponent, 
    ChatThreadComponent, 
    ChatThreadsComponent
  ],
  imports: [
    SharedModule, 
    RouterModule.forChild(routes)
  ],
  exports: [
    ChatInputComponent, 
    ChatFeedComponent,
    ChatMessagesComponent,
    ChatThreadsComponent
  ]
})
export class ChatModule { }
