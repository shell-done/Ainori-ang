import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duree' })
export class DureePipe implements PipeTransform {
    transform(duree: number): string {
        let hours = Math.floor(duree);
        let minutes = Math.floor((duree - hours)*60);

        return hours + 'h' + minutes;
    }
}