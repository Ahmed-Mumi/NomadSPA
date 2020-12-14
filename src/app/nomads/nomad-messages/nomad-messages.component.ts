import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/messages';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';
import { NomadsService } from 'src/app/_services/nomads.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nomad-messages',
  templateUrl: './nomad-messages.component.html',
  styleUrls: ['./nomad-messages.component.css'],
})
export class NomadMessagesComponent implements OnInit {
  @Input() messages: Message[];
  @Input() email: string;
  user: User;
  @ViewChild('messageForm') messageForm: NgForm;
  messageContent: string;

  constructor(
    private accountService: AccountService,
    public messageService: MessageService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  sendMessage() {
    // this.messageService
    //   .sendMessage(this.email, this.messageContent)
    //   .subscribe((message) => {
    //     this.messages.push(message);
    //     this.messageForm.reset();
    //   });
    this.messageService
      .sendMessage(this.email, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}
