/**
 * Fichier du component 'navbar'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * Classe du component 'navbar' servant à afficher la barre de navigation sur
 * toutes les pages
 */
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
