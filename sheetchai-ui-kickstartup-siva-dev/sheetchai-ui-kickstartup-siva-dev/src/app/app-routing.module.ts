import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { TeaminfoComponent } from './views/teaminfo/teaminfo.component';
import { GetDetailsComponent } from './views/get-details/get-details.component'

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'team-info/:teamname', component: TeaminfoComponent },
  { path: 'get-details', component: GetDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
