import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import localeFr from '@angular/common/locales/fr';

import { Co2Pipe } from './pipes/Co2Pipe';
import { DureePipe } from './pipes/DureePipe';
import { IfEmptyPipe } from './pipes/IfEmptyPipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TrajetComponent } from './trajet/trajet.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { CarpoolpageComponent } from './carpoolpage/carpoolpage.component';
import { FooterComponent } from './footer/footer.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    Co2Pipe,
    DureePipe,
    IfEmptyPipe,
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    TrajetComponent,
    ProfilepageComponent,
    CarpoolpageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "fr" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
