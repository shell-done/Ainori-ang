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
  getRequestCompleted = 0;

  userForm: FormGroup;
  userFormErrors = [];
  userFormApiErrors = [];

  edition: boolean = false;
  editionStatus: string = "BEFORE";

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
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

  getUtilisateur() {
    this.http.get(environment.apiHost + '/utilisateurs/' + environment.loggedUserId).subscribe(res => {
        this.setUtilisateurValue(res);
        this.getRequestCompleted++;
    });
  }

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

  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
        this.getRequestCompleted++;
    });
  }

  getCategories() {
    this.http.get(environment.apiHost + '/categories/').subscribe(res => {
        this.categories = res;
        this.getRequestCompleted++;
    });
  }


  getPossedeUtilisateur() {
    this.http.get(environment.apiHost + '/possedes/utilisateur/' + environment.loggedUserId).subscribe(res => {
      this.vehicules = res;
      this.getRequestCompleted++;
    })
  }

  changeEdition(value) {
    this.edition = value;
    this.editionStatus = 'BEFORE';
  }

  editing() {
    this.userFormErrors = [];
    if(this.userForm.invalid) {
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
        this.setUtilisateurValue(res);
        this.editionStatus = "SUCCESS";
        this.edition = false;
        this.userForm.enable();
      },
      err => {
        this.editionStatus = "BEFORE";
        this.userFormApiErrors = err.error;
        this.userForm.enable();
      }
    );
  }

}
