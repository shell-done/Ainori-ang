import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CarpoolpageComponent } from './carpoolpage/carpoolpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'mycarpools', component: CarpoolpageComponent },
  { path: 'myprofile', component: ProfilepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
