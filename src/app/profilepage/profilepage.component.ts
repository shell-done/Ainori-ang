import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})

export class ProfilepageComponent implements OnInit {
  utilisateur: any;

  userForm: FormGroup;
  afficheText: string;

  isEditing = false;

  editingStatus: string = "NONE";
  editingResponse: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nom : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      prenom : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      mail : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      telephone : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      adresse : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      ville : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      categorie : this.fb.control('', [Validators.required,
        Validators.minLength(2)]),
      password : this.fb.control('', [Validators.required,
        Validators.minLength(2)])
      });
  }

  ngAfterViewInit() {
    this.getUtilisateur();
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

  changeIsEditing(value) {
    this.isEditing = value;
    this.editingStatus = 'NONE';
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
    " / Ville : " + this.userForm.value['ville'] +
    " / Catégorie : " + this.userForm.value['categorie'] +
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

    this.editingStatus = "LOADING";
    this.http.post(environment.apiHost + '/utilisateurs/' + environment.loggedUserId, formData).subscribe(
      res => {
        this.editingStatus = "SUCCESS";
        this.editingResponse = res;
        this.isEditing = false;
      },
      err => {
        this.editingStatus = "ERROR";
        this.editingResponse = err.error;
      }
    );
  }

}
