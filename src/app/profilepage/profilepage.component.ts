import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})

export class ProfilepageComponent implements OnInit {
  utilisateur: any;
  villes: any;
  categories: any;
  vehicules: any;

  userForm: FormGroup;
  afficheText: string;

  edition: boolean = false;
  editionStatus: string = "NONE";
  editionResponse: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
        nom : this.fb.control('', [Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)]),
        prenom : this.fb.control('', [Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)]),
        mail : this.fb.control('', [Validators.required,
            Validators.email,
            Validators.maxLength(50)]),
        telephone : this.fb.control('', [Validators.required,
            Validators.pattern("/^[0-9]{10}$/"),
            Validators.minLength(10),
            Validators.maxLength(10)]),
        adresse : this.fb.control('', [Validators.required,
            Validators.minLength(100)]),
        ville : this.fb.control('', [Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)]),
        categorie : this.fb.control('', [Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)]),
        password : this.fb.control('', [Validators.required,
            Validators.minLength(5)])
    });
  }

  ngAfterViewInit() {
    this.getUtilisateur();
    this.getPossedeUtilisateur();
    this.getVilles();
    this.getCategories();
  }

  getUtilisateur() {
    this.http.get(environment.apiHost + '/utilisateurs/' + environment.loggedUserId).subscribe(res => {
        this.utilisateur = res;

        this.userForm.patchValue({
          nom: this.utilisateur.nom,
          prenom: this.utilisateur.prenom,
          mail: this.utilisateur.mail,
          telephone: this.utilisateur.telephone,
          adresse: this.utilisateur.adresse,
          ville: this.utilisateur.ville,
          categorie: this.utilisateur.categorie
        });
    });

  }

  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
    });
  }

  getCategories() {
    this.http.get(environment.apiHost + '/categories/').subscribe(res => {
        this.categories = res;
        console.log(this.categories);
    });
  }


  getPossedeUtilisateur() {
    this.http.get(environment.apiHost + '/possedes/utilisateurs/' + environment.loggedUserId).subscribe(res => {
      this.vehicules = res;
      console.log(this.vehicules);
    })
  }

  changeEdition(value) {
    this.edition = value;
    this.editionStatus = 'NONE';
  }

  isArray(obj : any) {
    return Array.isArray(obj);
  }

  editing() {
    //console.log(this.userForm.value);

    this.afficheText = "Voici le texte saisi - Nom : " + this.userForm.value['nom'] + 
    " / Prénom : " + this.userForm.value['prenom'] +
    " / Mail : " + this.userForm.value['mail'] +
    " / Téléphone : " + this.userForm.value['telephone'] +
    " / Adresse : " + this.userForm.value['adresse'] +
    " / Ville : " + this.userForm.value['ville.ville'] +
    " / Catégorie : " + this.userForm.value['categorie.categorie'] +
    " / Mot de passe : " + this.userForm.value['password'];

    var formData: any = new FormData();

    formData.append("nom", this.userForm.value['nom']);
    formData.append("prenom", this.userForm.value['prenom']);
    formData.append("mail", this.userForm.value['mail']);
    formData.append("telephone", this.userForm.value['telephone']);
    formData.append("adresse", this.userForm.value['adresse']);
    formData.append("ville", this.userForm.value['ville']);
    formData.append("categorie", this.userForm.value['categorie']);
    formData.append("password", this.userForm.value['password']);

    this.editionStatus = "LOADING";

    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');

    this.http.post(environment.apiHost + '/utilisateurs/' + environment.loggedUserId, formData, {headers: headers}).subscribe(
      res => {
        this.editionStatus = "SUCCESS";
        this.editionResponse = res;
        this.edition = false;
      },
      err => {
        this.editionStatus = "ERROR";
        this.editionResponse = err.error;
      }
    );
  }

}
