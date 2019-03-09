import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MessageService} from '../message.service';
import { Message}  from '../message.model';
import { Observable} from 'rxjs';
 
@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages: Observable<Message[]>; 
  constructor( private messageService: MessageService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMessages();
  }
  getMessages(){
   const channelId = this.route.snapshot.paramMap.get('id');
   this.messages = this.messageService.getMessages(channelId);
  }
}
