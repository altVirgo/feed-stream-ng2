import { Component, Output, EventEmitter } from '@angular/core';
import { BusinessType, ElemetType, TextType } from '../editPic.interface';

@Component({
    selector: 'app-edit-text',
    templateUrl: './editText.component.html',
    styleUrls: ['./editText.component.css']
})
export class EditTextComponent {
    @Output() selectText: EventEmitter<any> = new EventEmitter();

    private textOptions = [
        { src: 'assets/images/textImg/text_bg1/img.png' },
        { src: 'assets/images/textImg/text_bg2/img.png' },
        { src: 'assets/images/textImg/text_bg3/img.png' },
        { src: 'assets/images/textImg/text_bg4/img.png' },
        { src: 'assets/images/textImg/text_bg5/img.png' },
        { src: 'assets/images/textImg/text_bg6/img.png' },
        { src: 'assets/images/textImg/text_bg7/img.png' },
        { src: 'assets/images/textImg/text_bg8/img.png' },
        { src: 'assets/images/textImg/text_bg9/img.png' },
        { src: 'assets/images/textImg/text_bg10/img.png' },
        { src: 'assets/images/textImg/text_bg11/img.png' },
        { src: 'assets/images/textImg/text_bg12/img.png' },
        { src: 'assets/images/textImg/text_bg13/img.png' },
        { src: 'assets/images/textImg/text_bg14/img.png' },
        { src: 'assets/images/textImg/text_bg15/img.png' },
        { src: 'assets/images/textImg/text_bg16/img.png' },
        { src: 'assets/images/textImg/text_bg17/img.png' },
        { src: 'assets/images/textImg/text_bg18/img.png' },
        { src: 'assets/images/textImg/text_bg19/img.png' },
        { src: 'assets/images/textImg/text_bg1/img.png' },
        { src: 'assets/images/textImg/text_bg2/img.png' },
        { src: 'assets/images/textImg/text_bg3/img.png' },
        { src: 'assets/images/textImg/text_bg4/img.png' },
        { src: 'assets/images/textImg/text_bg5/img.png' },
        { src: 'assets/images/textImg/text_bg6/img.png' },
        { src: 'assets/images/textImg/text_bg7/img.png' },
        { src: 'assets/images/textImg/text_bg8/img.png' },
        { src: 'assets/images/textImg/text_bg9/img.png' },
        { src: 'assets/images/textImg/text_bg10/img.png' },
        { src: 'assets/images/textImg/text_bg11/img.png' },
        { src: 'assets/images/textImg/text_bg12/img.png' },
        { src: 'assets/images/textImg/text_bg13/img.png' },
        { src: 'assets/images/textImg/text_bg14/img.png' },
        { src: 'assets/images/textImg/text_bg15/img.png' },
        { src: 'assets/images/textImg/text_bg16/img.png' },
        { src: 'assets/images/textImg/text_bg17/img.png' },
        { src: 'assets/images/textImg/text_bg18/img.png' },
        { src: 'assets/images/textImg/text_bg19/img.png' }
    ];

    addEle(value, textType) {
        let options = {};
        if (textType === undefined) {
            options = value;
        } else {
            options = {
                text: value,
                type: textType
            };
        }

        this.selectText.emit({
            type: BusinessType.Text,
            options: options
        });

    }
}
