/**
 * Fichier du component 'carpoolspage'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carpoolspage',
  templateUrl: './carpoolspage.component.html',
  styleUrls: ['./carpoolspage.component.css']
})

/**
 * Classe du component 'carpoolspage' servant à afficher la liste des covoiturages
 * auxquels l'utilisateur s'est inscrit
 */
export class CarpoolspageComponent implements OnInit {
  researchStatus = "BEFORE"; // Statut de la recherche de trajet (BEFORE, WAITING ou AFTER)
  covoiturages: any = {}; // Liste des covoiturages

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.getCovoiturages();
  }

  /**
   * Récupération des covoiturages auxquels l'utilisateur s'est inscrit depuis l'API
   */
  getCovoiturages() {
    this.researchStatus = "WAITING";
    this.http.get(environment.apiHost + '/covoiturages/utilisateur/' + environment.loggedUserId).subscribe(res => {
        // Récupération des covoiturages et changement du statut
        this.covoiturages = res;
        this.researchStatus = "AFTER";
    });
  }
}
