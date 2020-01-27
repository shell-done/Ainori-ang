import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CarpoolspageComponent } from './carpoolspage/carpoolspage.component';
import { JourneyspageComponent } from './journeyspage/journeyspage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'covoiturages', component: CarpoolspageComponent },
  { path: 'trajets', component: JourneyspageComponent },
  { path: 'profil', component: ProfilepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
