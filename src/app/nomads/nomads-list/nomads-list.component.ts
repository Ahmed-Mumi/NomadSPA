import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nomad } from 'src/app/_models/nomad';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { NomadsService } from 'src/app/_services/nomads.service';

@Component({
  selector: 'app-nomads-list',
  templateUrl: './nomads-list.component.html',
  styleUrls: ['./nomads-list.component.css'],
})
export class NomadsListComponent implements OnInit {
  nomads: Nomad[];
  pagination: Pagination;
  userParams: UserParams = new UserParams();
  // nomads$: Observable<Nomad[]>;
  constructor(private nomadService: NomadsService) {}

  ngOnInit(): void {
    this.loadNomads();
    // this.nomads$ = this.nomadService.getNomads();
  }

  loadNomads() {
    this.nomadService.getNomads(this.userParams).subscribe((response) => {
      this.nomads = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadNomads();
  }
  // loadNomads() {
  //   this.nomadService.getNomads().subscribe((nomads) => {
  //     this.nomads = nomads;
  //   });
  // }
}
