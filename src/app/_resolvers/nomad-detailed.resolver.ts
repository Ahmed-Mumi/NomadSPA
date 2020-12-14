import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Nomad } from '../_models/nomad';
import { NomadsService } from '../_services/nomads.service';

@Injectable({
  providedIn: 'root',
})
export class NomadDetailedResolver implements Resolve<Nomad> {
  constructor(private nomadService: NomadsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Nomad> {
    return this.nomadService.getNomad(route.paramMap.get('email'));
  }
}
