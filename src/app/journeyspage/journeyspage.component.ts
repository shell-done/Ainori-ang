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
export class JourneyspageComponent implements OnInit {
  villes: any;
  typeTrajets: any;
  voitures: any;
  newTrajetFieldsReturned = 0;
  newTrajetForm: FormGroup;
  newTrajetClicked = false;
  newTrajetAngErrors = [];
  newTrajetApiErrors = [];
  
  trajets: any = {};
  researchStatus = "BEFORE";
  creationStatus = "BEFORE";

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

  getVilles() {
    this.http.get(environment.apiHost + '/villes/').subscribe(res => {
        this.villes = res;
        this.newTrajetFieldsReturned++;
    });
  }

  getTypeTrajets() {
    this.http.get(environment.apiHost + '/typetrajets/').subscribe(res => {
        this.typeTrajets = res;
        this.newTrajetFieldsReturned++;
    });
  }

  getVoitures() {
    this.http.get(environment.apiHost + '/possedes/utilisateur/' + environment.loggedUserId).subscribe(res => {
      this.voitures = res;
      this.newTrajetFieldsReturned++;
    });
  }

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

  resetForm() {
    this.newTrajetForm.patchValue({
      villeDepart: '-1',
      villeArrivee: '-1',
      dateDepart: formatDate(new Date(), "yyyy-MM-dd", "fr"),
      heureDepart: '12:00',
      duree: '',
      nbKm: '1',
      nbPlace: '1',
      commentaire: '1'
    });
  }

  createTrajet() {
    if(this.newTrajetForm.invalid) {
      this.newTrajetAngErrors = [];
      Object.keys(this.newTrajetForm.controls).forEach(key => {
        if(this.newTrajetForm.controls[key].hasError('required'))
        this.newTrajetAngErrors.push("Le champ " + key + " doit être renseigné");
        
        if(this.newTrajetForm.controls[key].hasError('min'))
        this.newTrajetAngErrors.push("Le champ " + key + " n'est pas valide");
      })

      this.newTrajetClicked = true;
      return;
    }

    var formData: any = new FormData();

    formData.append("villeDepart", this.newTrajetForm.value['villeDepart']);
    formData.append("villeArrivee", this.newTrajetForm.value['villeArrivee']);
    formData.append("dateDepart", this.newTrajetForm.value['dateDepart']);
    formData.append("heureDepart", this.newTrajetForm.value['heureDepart']);

    if(this.newTrajetForm.value['duree']) {
      let timeDuree = this.newTrajetForm.value['duree'].split(':');
      let duree = Number(timeDuree[0])*60 + Number(timeDuree[1])*10/6;
      formData.append("duree", duree);
    }

    formData.append("nbKm", this.newTrajetForm.value['nbKm']);
    formData.append("possede", this.newTrajetForm.value['voiture']);
    formData.append("nbPlace", this.newTrajetForm.value['nbPlace']);
    formData.append("typeTrajet", this.newTrajetForm.value['typeTrajet']);

    this.creationStatus = "LOADING";
    this.newTrajetApiErrors = [];
    this.newTrajetForm.disable();

    this.http.post(environment.apiHost +'/trajets/utilisateur/' + environment.loggedUserId, formData).subscribe(
      res => {
        this.creationStatus = "SUCCESS";
        this.resetForm();
        this.newTrajetForm.enable();
        this.getUtilisateurTrajets();
      },
      err => {
        this.creationStatus = "BEFORE";
        this.newTrajetApiErrors = err.error;
        this.newTrajetForm.enable();
      }
    )
  }

  getUtilisateurTrajets() {
    this.researchStatus = "LOADING";

    this.http.get(environment.apiHost + '/trajets/utilisateur/' + environment.loggedUserId + "?typeCovoit=Conducteur").subscribe(res => {
        this.trajets = res;
        this.researchStatus = "AFTER";
    });
  }
}
