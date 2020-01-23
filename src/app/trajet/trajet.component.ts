import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css']
})
export class TrajetComponent implements OnInit {
  placeLeftClass: string = "green";

  constructor() { }

  ngOnInit() {
    if(this.trajet.nbPlace - this.trajet.placeOccupee > 0)
      this.placeLeftClass = "green";
    else
      this.placeLeftClass = "red";
    
    console.log(this.trajet);
  }

  @Input() trajet: any;

}
