import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    const uid = 3;
    
    this.registrationStatus = "LOADING";
    this.http.post('http://localhost:8000/api/covoiturages/trajets/' + this.trajet.id + '/utilisateurs/' + uid, '').subscribe(
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
