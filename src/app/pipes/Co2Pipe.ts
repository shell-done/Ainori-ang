import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'co2' })
export class Co2Pipe implements PipeTransform {
    transform(co2: number): string {
        const co2SavedPerKm = 0.253;

        return (co2*co2SavedPerKm).toFixed(3);
    }
}