import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (email) => {
      // this.toastr.info(email + ' has connected');
      this.onlineUsers$.pipe(take(1)).subscribe((emails) => {
        this.onlineUsersSource.next([...emails, email]);
      });
    });

    this.hubConnection.on('GetOnlineUsers', (emails: string[]) => {
      this.onlineUsersSource.next(emails);
    });

    this.hubConnection.on('UserIsOffline', (email) => {
      // this.toastr.info(email + ' has disconnected');
      this.onlineUsers$.pipe(take(1)).subscribe((emails) => {
        this.onlineUsersSource.next([...emails.filter((x) => x !== email)]);
      });
    });

    this.hubConnection.on('NewMessageReceived', ({ email }) => {
      this.toastr
        .info(email + ' has sent you a new message')
        .onTap.pipe(take(1))
        .subscribe(() =>
          this.router.navigateByUrl('/nomads/' + email + '?tab=2')
        );
    });
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}
