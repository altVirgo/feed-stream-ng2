import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'int' })
export class IntPipe implements PipeTransform {
    transform(num: number) {
        return Math.round(num);
    }
}

