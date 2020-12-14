import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Nomad } from 'src/app/_models/nomad';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { NomadsService } from 'src/app/_services/nomads.service';

@Component({
  selector: 'app-nomad-edit',
  templateUrl: './nomad-edit.component.html',
  styleUrls: ['./nomad-edit.component.css'],
})
export class NomadEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  nomad: Nomad;
  user: User;
  // maxDate: Date;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private nomadService: NomadsService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));

    //   this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  ngOnInit(): void {
    this.loadNomad();
  }

  loadNomad() {
    this.nomadService.getNomad(this.user.email).subscribe((nomad) => {
      this.nomad = nomad;
    });
  }

  updateNomad() {
    this.nomadService.updateNomad(this.nomad).subscribe(() => {
      this.toastr.success('Profile update successfully');
      this.editForm.reset(this.nomad);
    });
  }
}
