import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { NomadEditComponent } from './nomads/nomad-edit/nomad-edit.component';
import { NomadsDetailComponent } from './nomads/nomads-detail/nomads-detail.component';
import { NomadsListComponent } from './nomads/nomads-list/nomads-list.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { NomadDetailedResolver } from './_resolvers/nomad-detailed.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'nomads', component: NomadsListComponent },
      {
        path: 'nomads/:email',
        component: NomadsDetailComponent,
        resolve: { nomad: NomadDetailedResolver },
      },
      {
        path: 'nomad/edit',
        component: NomadEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      { path: 'messages', component: MessagesComponent },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  // { path: 'nomads', component: NomadsListComponent, canActivate: [AuthGuard] },
  // { path: 'nomad/:id', component: NomadsDetailComponent },
  // { path: 'messages', component: MessagesComponent },

  { path: 'errors', component: TestErrorsComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
