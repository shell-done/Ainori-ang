/**
 * Fichier du component 'profilepage'
 * 
 * @author Margaux DOUDET <margaux.doudet@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})

/**
 * Classe du component 'profilepage' servant à voir et modifier les paramères de l'utilisateur
 * actuel ainsi que de voir la liste de ses véhicules
 */
export class ProfilepageComponent implements OnInit {
  utilisateur: any; // Utilisateur récupéré
  villes: any; // Liste des villes
  categories: any; // Liste des catégories
  vehicules: any; // Liste des véhicules
  getRequestCompleted = 0; // Nombre de requête GET complète

  userForm: FormGroup; // Formulaire de modification d'utilisateur
  userFormErrors = []; // Liste des erreurs renvoyées par angular lors de la création d'un trajet
  userFormApiErrors = []; // Liste des erreurs renvoyées par l'API lors de la création d'un trajet

  edition: boolean = false; // true si en cours d'édition, false sinon
  editionStatus: string = "BEFORE"; // Statut de l'édition d'un utilisateur (BEFORE, WAITING ou AFTER)

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    // Création du formulaire
    this.userForm = this.fb.group({
        nom : this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        prenom : this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        mail : this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        telephone : this.fb.control('', [Validators.pattern("^[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]),
        adresse : this.fb.control('', [Validators.maxLength(100)]),
        ville : this.fb.control('', [Validators.required]),
        categorie : this.fb.control('', [Validators.required]),
        password : this.fb.control('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngAfterViewInit() {
    this.getVilles();
    this.getCategories();
    this.getUtilisateur();
    this.getPossedeUtilisateur();
  }

  /**
   * Récupère l'utilisateur courant
   */
  getUtilisateur() {
    this.http.get(environment.apiHost + '/utilisateurs/' + environment.loggedUserId).subscribe(res => {
        this.setUtilisateurValue(res);
        this.getRequestCompleted++;
    });
  }

  /**
   * Définit l'objet utilisateur ainsi que le formulaire associé
   */
  setUtilisateurValue(utilisateur: any) {
    this.utilisateur = utilisateur;

    this.userForm.patchValue({
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      mail: this.utilisateur.mail,
      telephone: this.utilisateur.telephone,
      adresse: this.utilisateur.adresse,
      ville: this.utilisateur.ville.id,
      categorie: this.utilisateur.categorie.id
    });
  }

  /**
   * Récupère les villes
   */
  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
        this.getRequestCompleted++;
    });
  }

  /**
   * Récupère les catégories
   */
  getCategories() {
    this.http.get(environment.apiHost + '/categories/').subscribe(res => {
        this.categories = res;
        this.getRequestCompleted++;
    });
  }

  /**
   * Récupère les véhicules d'un utilisateur
   */
  getPossedeUtilisateur() {
    this.http.get(environment.apiHost + '/possedes/utilisateur/' + environment.loggedUserId).subscribe(res => {
      this.vehicules = res;
      this.getRequestCompleted++;
    })
  }

  /**
   * Change le mode d'édition
   * 
   * @param value la nouvelle valeur de l'édition
   */
  changeEdition(value) {
    this.edition = value;
    this.editionStatus = 'BEFORE';
  }

  /**
   * Vérifie le validité du formulaire pour modifier l'utilisateur
   * S'il n'y a aucune erreur, celui-ci est créé
   * S'il y a des erreurs (d'angular ou de l'API) celles-ci sont affichées
   */
  editing() {
    this.userFormErrors = [];
    if(this.userForm.invalid) {
      // Récupération des erreurs générées par angular
      Object.keys(this.userForm.controls).forEach(key => {
        if(this.userForm.controls[key].hasError('required'))
          this.userFormErrors.push("Le champ " + key + " doit être renseigné");
        
        if(this.userForm.controls[key].hasError('minlength'))
          this.userFormErrors.push("Le champ " + key + " est trop court (minimum " + this.userForm.controls[key].errors.minlength.requiredLength + " caractères)");

        if(this.userForm.controls[key].hasError('maxlength'))
          this.userFormErrors.push("Le champ " + key + " est trop long (maximum " + this.userForm.controls[key].errors.maxlength.requiredLength + " caractères)");

        if(this.userForm.controls[key].hasError('pattern'))
          this.userFormErrors.push("Le champ téléphone n'est pas au bon format (10 chiffres)");

        if(this.userForm.controls[key].hasError('email'))
          this.userFormErrors.push("L'adresse email n'est pas au bon format");
      })

      return;
    }

    var formData: any = new FormData();

    formData.append("nom", this.userForm.value['nom']);
    formData.append("prenom", this.userForm.value['prenom']);
    formData.append("mail", this.userForm.value['mail']);
    formData.append("telephone", this.userForm.value['telephone']);
    formData.append("adresse", this.userForm.value['adresse']);
    formData.append("ville", this.userForm.value['ville']);
    formData.append("categorie", this.userForm.value['categorie']);
    formData.append("plainPassword", this.userForm.value['password']);

    this.editionStatus = "WAITING";
    this.userForm.disable();

    this.http.post(environment.apiHost + '/utilisateurs/' + environment.loggedUserId, formData).subscribe(
      res => {
        // Si l'utitlisateur a bien été modifié, on affiche la 'nouvelle version' de l'utilisateur
        this.setUtilisateurValue(res);
        this.editionStatus = "SUCCESS";
        this.edition = false;
        this.userForm.enable();
      },
      err => {
        // En cas d'erreur de l'API, on les affiche
        this.editionStatus = "BEFORE";
        this.userFormApiErrors = err.error;
        this.userForm.enable();
      }
    );
  }

}
