import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carpoolspage',
  templateUrl: './carpoolspage.component.html',
  styleUrls: ['./carpoolspage.component.css']
})
export class CarpoolspageComponent implements OnInit {
  researchStatus = "BEFORE";
  covoiturages: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.getCovoiturages();
  }

  getCovoiturages() {
    this.researchStatus = "WAITING";
    this.http.get(environment.apiHost + '/covoiturages/utilisateur/' + environment.loggedUserId).subscribe(res => {
        this.covoiturages = res;
        this.researchStatus = "AFTER";
    });
  }
}
