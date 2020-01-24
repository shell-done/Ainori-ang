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
  placeLeftClass: string = "green";

  registrationStatus: string = "NONE";
  registrationResponse: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.hasPlacesLeft = (this.trajet.nbPlace - this.trajet.placeOccupee > 0);

    if(this.hasPlacesLeft)
      this.placeLeftClass = "green";
    else
      this.placeLeftClass = "red";
  }

  isArray(obj : any) {
    return Array.isArray(obj);
  }

  register() {
    this.registrationStatus = "LOADING";
    this.http.post(environment.apiHost + '/covoiturages/trajets/' + this.trajet.id + '/utilisateurs/' + environment.loggedUserId, '').subscribe(
      res => {
        this.registrationStatus = "SUCCESS";
        this.registrationResponse = res;
      },
      err => {
        this.registrationStatus = "ERROR";
        this.registrationResponse = err.error;
      }
    );
  }

  @Input() trajet: any;

}
