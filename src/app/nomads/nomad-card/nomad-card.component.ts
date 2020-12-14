import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Nomad } from 'src/app/_models/nomad';
import { NomadsService } from 'src/app/_services/nomads.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-nomad-card',
  templateUrl: './nomad-card.component.html',
  styleUrls: ['./nomad-card.component.css'],
})
export class NomadCardComponent implements OnInit {
  @Input() nomad: Nomad;
  constructor(
    private nomadService: NomadsService,
    private toastr: ToastrService,
    public presence: PresenceService
  ) {}

  ngOnInit(): void {}

  addReaction(nomad: Nomad) {
    this.nomadService.addReaction(nomad.id).subscribe(() => {
      this.toastr.success('you have liker nomad');
    });
  }
}
