import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css']
})
export class TrajetComponent implements OnInit {
  id: number;

  constructor() { 
    this.id = 3;
  }

  ngOnInit() {
  }

}
