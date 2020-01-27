/**
 * Fichier du pipe 'Duree'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Classe 'DureePipe' servant à afficher la durée en HH:ii
 */
@Pipe({ name: 'duree' })
export class DureePipe implements PipeTransform {
    /**
     * Renvoie une chaine de caractère représentant la durée au
     * format HH:ii
     * 
     * @param duree la duree du trajet en heure
     * 
     * @return la durée
     */
    transform(duree: number): string {
        let hours = Math.floor(duree);
        let minutes = Math.floor((duree - hours)*60);

        return hours + 'h' + minutes;
    }
}