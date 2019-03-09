import { Component, OnInit, Input } from '@angular/core';
import { MessageService} from '../message.service';
import { Message}  from '../message.model';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
 @Input() message: Message;
 incoming : boolean ;  
  constructor(
              private auth:AuthService, 
              private messageService: MessageService
              ) { }

  ngOnInit() { 
    this.checkIncoming();
  }

  checkIncoming(){
    const user = this.auth.currentUserId;
    if( this.message.sender && user){
      this.incoming = this.message.senderId !== user ;
    }
  }

}
