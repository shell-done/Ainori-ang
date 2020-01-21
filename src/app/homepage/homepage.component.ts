import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getVilles();
    this.getTypeTrajets();
  }

  displayMoreParam() {
    this.moreParamHidden = !this.moreParamHidden;

    this.moreParamStr = this.moreParamHidden ? "Afficher plus de paramètres" : "Afficher moins de paramètres";
  }

  getVilles() {
    this.http.get('http://localhost:8000/api/villes/').subscribe(res => {
        this.villes = res;
    });
  }

  getTypeTrajets() {
    this.http.get('http://localhost:8000/api/typetrajets/').subscribe(res => {
      console.log(res);
        this.typeTrajets = res;
    });
  }
}
