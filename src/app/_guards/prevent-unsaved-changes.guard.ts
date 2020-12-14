import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NomadEditComponent } from '../nomads/nomad-edit/nomad-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {}

  canDeactivate(component: NomadEditComponent): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      // return confirm(
      //   'Are you sure you want to continue? Any unsaved changes will be lost!'
      // );
      return this.confirmService.confirm();
    }
    return true;
  }
}
