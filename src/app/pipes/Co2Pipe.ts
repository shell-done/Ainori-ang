/**
 * Fichier du pipe 'Co2'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Classe 'Co2Pipe' servant à afficher la quantité de Co2 économisé
 * en fonction de la distance du trajet
 */
@Pipe({ name: 'co2' })
export class Co2Pipe implements PipeTransform {
    /**
     * Renvoie une chaine de caractère représentant la quantité de Co2
     * économisé (en kg) en fonction de la distance en km passée en
     * paramètre
     * 
     * @param distance la distance du trajet
     * 
     * @return la quantité de Co2 économisé
     */
    transform(distance: number): string {
        const co2SavedPerKm = 0.253;

        return (distance*co2SavedPerKm).toFixed(3);
    }
}