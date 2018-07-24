import { CanvasDraw } from './canvas.draw';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Group } from 'fabric';
import { CanvasOptions, CanvasDrawStack, DrawConfig } from './canvas.interface';

import * as fabric from 'fabric';
import * as _ from 'lodash';
import { TextOptions } from './text.interface';
import { Clipboard } from './clipboard.interface';

@Injectable()
export class CanvasService {

    private fabric = (<any>fabric).fabric;      // fabric对象

    private stacked: CanvasDrawStack;
    public clipboard: Clipboard;
    public constructor(private http: Http) {
        this.stacked = <CanvasDrawStack>{};
        this.clipboard = {};
    }

    public getCanvas(id?: string): CanvasDraw {
        return this.stacked[id];
    }

    public getAllCanvas() {
        return this.stacked;
    }

    public addCanvas(id: string, options: CanvasOptions, config: DrawConfig): CanvasDraw {
        this.stacked[id] = new CanvasDraw(id, options, config, this);
        return this.stacked[id];
    }

}
