import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css']
})
export class TrajetComponent implements OnInit {
  hasPlacesLeft: boolean = true;

  registrationStatus: string = "BEFORE";
  registrationResponse: any;
  registrationErrors = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.hasPlacesLeft = (this.trajet.nbPlace - this.trajet.placeOccupee > 0);
  }

  register() {
    this.registrationStatus = "WAITING";
    this.http.post(environment.apiHost + '/covoiturages/trajets/' + this.trajet.id + '/utilisateurs/' + environment.loggedUserId, '').subscribe(
      res => {
        this.registrationStatus = "SUCCESS";
        this.registrationResponse = res;
      },
      err => {
        this.registrationStatus = "ERROR";
        this.registrationErrors = err.error;
      }
    );
  }

  @Input() trajet: any;
  @Input() mode: string;
}
