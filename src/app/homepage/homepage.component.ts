import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

class SearchParams {
  villeDepart: string = "-1";
  villeArrivee: string = "-1";
  dateDepart: string = formatDate(new Date(), "yyyy-MM-dd", "fr");
  heureDepart: string = "12:00";
  typeTrajet: string = "0";

  requestParams(addOptionalParam: boolean) : string {
    let requestStr = "?";

    requestStr += "villeDepart=" + this.villeDepart;
    requestStr += "&villeArrivee=" + this.villeArrivee;
    requestStr += "&dateDepart=" + this.dateDepart;

    if(addOptionalParam) {
      if(this.heureDepart)
        requestStr += "&heureDepart=" + this.heureDepart;
      
      if(this.typeTrajet != "0")
        requestStr += "&typeTrajet=" + this.typeTrajet;
    }

    return requestStr;
  }
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  moreParamHidden = true;
  moreParamStr = "Afficher plus de paramètres";
  villes: any;
  typeTrajets: any;

  searchParams: SearchParams;
  trajets = {};
  researchStatus = "BEFORE";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchParams = new SearchParams();  
  }

  ngAfterViewInit() {
    this.getVilles();
    this.getTypeTrajets();
  }

  displayMoreParam() {
    this.moreParamHidden = !this.moreParamHidden;
    this.moreParamStr = this.moreParamHidden ? "Afficher plus de paramètres" : "Afficher moins de paramètres";
  }

  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
    });
  }

  getTypeTrajets() {
    this.http.get(environment.apiHost + '/typetrajets/').subscribe(res => {
        this.typeTrajets = res;
    });
  }

  disableResearchButton() {
    let disable = false;

    if(this.searchParams.villeDepart == "-1")
      disable = true;

    if(this.searchParams.villeArrivee == "-1")
      disable = true;

    if(!Date.parse(this.searchParams.dateDepart))
      disable = true;

    return disable;
  }

  research() {
    let requestParams = this.searchParams.requestParams(!this.moreParamHidden);
    this.researchStatus = "WAITING";

    this.http.get(environment.apiHost + '/trajets/' + requestParams).subscribe(res => {
        this.trajets = res;
        this.researchStatus = "AFTER";
    });
  }
}
