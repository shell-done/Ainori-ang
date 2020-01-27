/**
 * Fichier du pipe 'IfEmpty'
 * 
 * @author Alexandre THOMAS <alexandre.thomas@isen-ouest.yncrea.fr>
 * @version 1.0.0
 */
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Classe 'IfEmpty' servant à afficher un message de remplacement lorsque la
 * valeur passée est vide
 */
@Pipe({ name: 'if_empty' })
export class IfEmptyPipe implements PipeTransform {
    /**
     * Renvoie la chaine str si non vide, la chaine placeholder sinon
     * 
     * @param str la chaine à vérifier
     * @param placeholder la chaine de remplacement
     * 
     * @return str ou placeholder
     */
    transform(str: string, placeholder: string): string {
        if(str)
            return str;

        return placeholder;
    }
}