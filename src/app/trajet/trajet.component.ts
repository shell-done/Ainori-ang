/**
 * Fichier du component 'trajet'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css']
})

/**
 * Classe du component 'trajet' servant à afficher un trajet à partir de
 * l'objet renvoyé par l'API
 * 
 * Peut fonctionner en différents mode :
 * 'VIEW' : Affichage classique, aucune action possible
 * 'REGISTER' : Affichage classique + bouton d'enregistrement, possibilité de s'inscrire à ce trajet
 */
export class TrajetComponent implements OnInit {
  hasPlacesLeft: boolean = true; // true s'il reste des places dans ce trajet, false sinon

  registrationStatus: string = "BEFORE"; // Statut d'enregistrement au trajet (BEFORE, WAITING ou AFTER)
  registrationResponse: any; // Réponse à l'enregistrement
  registrationErrors = []; // Liste des erreurs renvoyées par l'API lors de l'enregistrement au trajet

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Vérifie s'il reste des places
    this.hasPlacesLeft = (this.trajet.nbPlace - this.trajet.placeOccupee > 0);
  }

  /**
   * Demande l'enregistrement de l'utilisateur actuel à ce trajet
   */
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

  @Input() trajet: any; // L'objet trajet renvoyé par l'API
  @Input() mode: string; // Le mode d'utilisation du component, 'REGISTER': Affiche le bouton d'inscription, 'VIEW': Ne permet aucune action sur le trajet
}
