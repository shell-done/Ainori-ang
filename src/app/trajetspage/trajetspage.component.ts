import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trajetspage',
  templateUrl: './trajetspage.component.html',
  styleUrls: ['./trajetspage.component.css']
})
export class TrajetspageComponent implements OnInit {
  trajets = {};
  researchStatus = "BEFORE";

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.getUtilisateurTrajets();
  }

  getUtilisateurTrajets() {
    this.researchStatus = "LOADING";

    this.http.get(environment.apiHost + '/trajets/utilisateur/' + environment.loggedUserId + "?typeCovoit=Conducteur").subscribe(res => {
        this.trajets = res;
        this.researchStatus = "AFTER";
    });
  }
}
