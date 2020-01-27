/**
 * Fichier du component 'journeyspage'
 * 
 * @author Margaux DOUDET <margaux.doudet@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-journeyspage',
  templateUrl: './journeyspage.component.html',
  styleUrls: ['./journeyspage.component.css']
})

/**
 * Classe du component 'journeyspage' servant à afficher la liste des trajets
 * créés par l'utilisateur ainsi qu'un formulaire pour en créer d'autres
 */
export class JourneyspageComponent implements OnInit {
  villes: any; // Liste des villes
  typeTrajets: any; // Liste des typeTrajets
  voitures: any; // Liste des possede
  getRequestCompleted = 0; // Nombre de requête GET réussies

  newTrajetForm: FormGroup; // Formulaire de création
  newTrajetAngErrors = []; // Liste des erreurs renvoyées par angular lors de la création d'un trajet
  newTrajetApiErrors = []; // Liste des erreurs renvoyées par l'API lors de la création d'un trajet
  
  trajets: any = {}; // Liste des trajets
  researchStatus = "BEFORE"; // Statut de la recherche de trajet (BEFORE, WAITING ou AFTER)
  creationStatus = "BEFORE"; // Statut de la création de trajet (BEFORE, WAITING ou AFTER)

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.generateForm();
  }

  ngAfterContentInit() {
    this.getVilles();
    this.getTypeTrajets();
    this.getVoitures();
    this.getUtilisateurTrajets();
  }

  /**
   * Récupère la liste des villes
   */
  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
        this.getRequestCompleted++;
    });
  }

  /**
   * Récupère la liste des typetrajets
   */
  getTypeTrajets() {
    this.http.get(environment.apiHost + '/typetrajets/').subscribe(res => {
        this.typeTrajets = res;
        this.getRequestCompleted++;
    });
  }

  /**
   * Récupère la liste des voitures appartenant à un utilisateur
   */
  getVoitures() {
    this.http.get(environment.apiHost + '/possedes/utilisateur/' + environment.loggedUserId).subscribe(res => {
      this.voitures = res;
      this.getRequestCompleted++;
    });
  }

  /**
   * Génère le formulaire de création de trajet en y appliquant des validators
   */
  generateForm() {
    this.newTrajetForm = this.fb.group({
      villeDepart: this.fb.control('-1', [Validators.required, Validators.min(1)]),
      villeArrivee: this.fb.control('-1', [Validators.required, Validators.min(1)]),
      dateDepart: this.fb.control(formatDate(new Date(), "yyyy-MM-dd", "fr"), [Validators.required]),
      heureDepart: this.fb.control('12:00', [Validators.required]),
      duree: this.fb.control(''),
      nbKm: this.fb.control('1', [Validators.required, Validators.min(1)]),
      voiture: this.fb.control('', [Validators.required, Validators.min(1)]),
      nbPlace: this.fb.control('1', [Validators.required, Validators.min(1)]),
      typeTrajet: this.fb.control('', [Validators.required, Validators.min(1)]),
      commentaire: this.fb.control('')
    });
  }

  /**
   * Réinitialise le formulaire
   */
  resetForm() {
    this.newTrajetForm.patchValue({
      villeDepart: '-1',
      villeArrivee: '-1',
      dateDepart: formatDate(new Date(), "yyyy-MM-dd", "fr"),
      heureDepart: '12:00',
      duree: '',
      nbKm: '1',
      nbPlace: '1',
      commentaire: ''
    });
    this.newTrajetAngErrors = [];
  }

  /**
   * Vérifie le validité du formulaire pour créer un nouveau trajet
   * S'il n'y a aucune erreur, celui-ci est créé
   * S'il y a des erreurs (d'angular ou de l'API) celles-ci sont affichées
   */
  createTrajet() {
    this.newTrajetAngErrors = [];
    if(this.newTrajetForm.invalid) { 
      // Récupération des erreurs générées par angular
      Object.keys(this.newTrajetForm.controls).forEach(key => {
        if(this.newTrajetForm.controls[key].hasError('required'))
          this.newTrajetAngErrors.push("Le champ " + key + " doit être renseigné");
        
        if(this.newTrajetForm.controls[key].hasError('min'))
          this.newTrajetAngErrors.push("Le champ " + key + " n'est pas valide");
      })

      return;
    }

    var formData: any = new FormData();

    formData.append("villeDepart", this.newTrajetForm.value['villeDepart']);
    formData.append("villeArrivee", this.newTrajetForm.value['villeArrivee']);
    formData.append("dateDepart", this.newTrajetForm.value['dateDepart']);
    formData.append("heureDepart", this.newTrajetForm.value['heureDepart']);

    // Transforme la valeur de la durée en nombre flottant
    if(this.newTrajetForm.value['duree']) {
      let timeDuree = this.newTrajetForm.value['duree'].split(':');
      let duree = Number(timeDuree[0])*60 + Number(timeDuree[1])*10/6;
      formData.append("duree", duree);
    }

    formData.append("nbKm", this.newTrajetForm.value['nbKm']);
    formData.append("possede", this.newTrajetForm.value['voiture']);
    formData.append("nbPlace", this.newTrajetForm.value['nbPlace']);
    formData.append("typeTrajet", this.newTrajetForm.value['typeTrajet']);
    formData.append("commentaire", this.newTrajetForm.value['commentaire']);

    this.creationStatus = "WAITING";
    this.newTrajetApiErrors = [];
    this.newTrajetForm.disable();

    this.http.post(environment.apiHost +'/trajets/utilisateur/' + environment.loggedUserId, formData).subscribe(
      res => {
        // Si le trajet a bien été créé, on affiche un message et on réinitialise le formulaire
        this.creationStatus = "SUCCESS";
        this.resetForm();
        this.newTrajetForm.enable();
        this.getUtilisateurTrajets();
      },
      err => {
        // En cas d'erreur de l'API, on les affiche
        this.creationStatus = "BEFORE";
        this.newTrajetApiErrors = err.error;
        this.newTrajetForm.enable();
      }
    )
  }

  /**
   * Récupère les trajets créés par un utilisateur
   */
  getUtilisateurTrajets() {
    this.researchStatus = "WAITING";

    this.http.get(environment.apiHost + '/trajets/utilisateur/' + environment.loggedUserId).subscribe(res => {
        this.trajets = res;
        this.researchStatus = "AFTER";
    });
  }
}
