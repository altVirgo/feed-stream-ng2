import { Component, Input } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent  {
    @Input() data: any = {};
    constructor(private subject: NzModalSubject) {
        this.subject.on('onOk', () => {
            this.subject.next({
                type: 'ok',
                data: {}
            });
        });
    }

}
