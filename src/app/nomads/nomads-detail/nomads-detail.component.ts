import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/messages';
import { Nomad } from 'src/app/_models/nomad';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';
import { NomadsService } from 'src/app/_services/nomads.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-nomads-detail',
  templateUrl: './nomads-detail.component.html',
  styleUrls: ['./nomads-detail.component.css'],
})
export class NomadsDetailComponent implements OnInit, OnDestroy {
  @ViewChild('nomadTabs', { static: true }) nomadTabs: TabsetComponent;
  activeTab: TabDirective;
  nomad: Nomad;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  messages: Message[] = [];
  user: User;
  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // this.loadNomad();

    this.route.data.subscribe((data) => {
      this.nomad = data.nomad;
    });

    this.route.queryParams.subscribe((params) => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.nomad.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }

    return imageUrls;
  }

  // loadNomad() {
  //   this.nomadService
  //     .getNomad(this.route.snapshot.paramMap.get('email'))
  //     .subscribe((nomad) => {
  //       this.nomad = nomad;
  //       this.galleryImages = this.getImages();
  //     });
  // }

  loadMessages() {
    this.messageService
      .getMessageThread(this.nomad.email)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      // this.loadMessages();
      this.messageService.createHubConnection(this.user, this.nomad.email);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  selectTab(tabId: number) {
    this.nomadTabs.tabs[tabId].active = true;
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
