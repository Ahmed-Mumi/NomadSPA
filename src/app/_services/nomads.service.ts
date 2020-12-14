import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Nomad } from '../_models/nomad';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class NomadsService {
  baseUrl = environment.apiUrl;
  nomads: Nomad[] = [];
  constructor(private http: HttpClient) {}

  // getNomads() {
  // if (this.nomads.length > 0) return of(this.nomads);
  // return this.http.get<Nomad[]>(this.baseUrl + 'users').pipe(
  //   map((nomads) => {
  //     this.nomads = nomads;
  //     return nomads;
  //   })
  // );
  getNomads(userParams: UserParams) {
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    return getPaginatedResult<Nomad[]>(
      this.baseUrl + 'users',
      params,
      this.http
    );
  }

  // private getPaginatedResult<T>(url, params) {
  //   const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  //   return this.http
  //     .get<T>(url, { observe: 'response', params })
  //     .pipe(
  //       map((response) => {
  //         paginatedResult.result = response.body;
  //         if (response.headers.get('Pagination') !== null) {
  //           paginatedResult.pagination = JSON.parse(
  //             response.headers.get('Pagination')
  //           );
  //         }
  //         return paginatedResult;
  //       })
  //     );
  // }

  // private getPaginationHeaders(pageNumber: number, pageSize: number) {
  //   let params = new HttpParams();

  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());

  //   return params;
  // }

  getNomad(email: string) {
    const nomad = this.nomads.find((x) => x.email === email);
    if (nomad !== undefined) {
      return of(nomad);
    }
    return this.http.get<Nomad>(this.baseUrl + 'users/' + email);
  }

  updateNomad(nomad: Nomad) {
    return this.http.put(this.baseUrl + 'users', nomad).pipe(
      map(() => {
        const index = this.nomads.indexOf(nomad);
        this.nomads[index] = nomad;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addReaction(id: number) {
    return this.http.post(this.baseUrl + 'reactions/' + id, {});
  }

  getReactions() {
    return this.http.get(this.baseUrl + 'reactions');
  }
}
