import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { ThreadService} from '../thread.service';
import { Thread } from '../thread.model'


@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  
  threads: Observable<Thread[]>
  constructor( private threadService: ThreadService) { }

  ngOnInit() {
    this.threads = this.threadService.getThreads()
  }

}
