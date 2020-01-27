/**
 * Fichier du component 'homepage'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Classe représentant les différents paramètres de recherche
 * du formulaire de la page 'homepage'
 */
class SearchParams {
  // Paramètres du formulaire
  villeDepart: string = "-1";
  villeArrivee: string = "-1";
  dateDepart: string = formatDate(new Date(), "yyyy-MM-dd", "fr");
  heureDepart: string = "12:00";
  typeTrajet: string = "0";

  /**
   * Retourne la liste des paramètres sous forme de chaine utilisable
   * pour les requêtes HTTP (?param1=value1&param2=value2...)
   * 
   * @param addOptionalParam Si true, alors les paramètres optionnels (heureDepart et typeTrajet) sont ajoutés à la chaine, sinon ils sont ignoré
   * 
   * @return la chaine de caractères représentant les paramètres
   */
  requestParams(addOptionalParam: boolean) : string {
    let requestStr = "?";

    requestStr += "villeDepart=" + this.villeDepart;
    requestStr += "&villeArrivee=" + this.villeArrivee;
    requestStr += "&dateDepart=" + this.dateDepart;

    // On ajoute éventuellement les paramètres optionnels
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

/**
 * Classe du component 'homepage' servant à effectuer une recherche
 * de trajet en fonctions de différents paramètres
 */
export class HomepageComponent implements OnInit {
  moreParamHidden = true; // Affiche ou non les paramètres optionnels
  moreParamStr = "Afficher plus de paramètres";
  villes: any; // Liste des villes
  typeTrajets: any; // Liste des typetrajets

  searchParams: SearchParams; // Paramètres de recherche
  trajets = {}; // Liste des trajets trouvés
  researchStatus = "BEFORE"; // Statut de la recherche de trajet (BEFORE, WAITING ou AFTER)

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchParams = new SearchParams();  
  }

  ngAfterViewInit() {
    // Récupération des villes et typetrajets
    this.getVilles();
    this.getTypeTrajets();
  }

  /**
   * Affiche/cache les paramètres optionnels
   */
  displayMoreParam() {
    this.moreParamHidden = !this.moreParamHidden;
    this.moreParamStr = this.moreParamHidden ? "Afficher plus de paramètres" : "Afficher moins de paramètres";
  }

  /**
   * Récupères les villes depuis l'API
   */
  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
    });
  }

  /**
   * Récupère les typestrajets depuis l'API
   */
  getTypeTrajets() {
    this.http.get(environment.apiHost + '/typetrajets/').subscribe(res => {
        this.typeTrajets = res;
    });
  }

  /**
   * Renvoie le statut du bouton de recherche (true: activé, false: désactivé)
   * en fonction de la validité des paramètres du formulaire
   */
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

  /**
   * Récupère les trajets en utilisant les paramètres passés
   */
  research() {
    let requestParams = this.searchParams.requestParams(!this.moreParamHidden);
    this.researchStatus = "WAITING";

    this.http.get(environment.apiHost + '/trajets/' + requestParams).subscribe(res => {
        this.trajets = res;
        this.researchStatus = "AFTER";
    });
  }
}
