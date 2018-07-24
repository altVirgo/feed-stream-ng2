import { Component, Output, EventEmitter } from '@angular/core';
import { BusinessType } from '../editPic.interface';

@Component({
    selector: 'app-edit-template',
    templateUrl: './editTemplate.component.html',
    styleUrls: ['./editTemplate.component.css']
})
export class EditTemplateComponent {
    @Output() selectTemplate: EventEmitter<any> = new EventEmitter();

    private templatOptions = [
        { src: 'assets/images/template/template001/img.png' },
        { src: 'assets/images/template/template002/img.png' },
        { src: 'assets/images/template/template003/img.png' },
        { src: 'assets/images/template/template004/img.png' },
        { src: 'assets/images/template/template005/img.png' },
        { src: 'assets/images/template/template006/img.png' },
        { src: 'assets/images/template/template007/img.png' },
        { src: 'assets/images/template/template008/img.png' }
    ];

    addEle(item) {
        this.selectTemplate.emit({
            type: BusinessType.Template,
            options: item
        });
    }
}
