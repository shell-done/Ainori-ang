import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'if_empty' })
export class IfEmptyPipe implements PipeTransform {
    transform(str: string, placeholder: string): string {
        if(str)
            return str;

        return placeholder;
    }
}