import { Component, EventEmitter, Output } from '@angular/core';
import { BusinessType } from '../editPic.interface';

@Component({
    selector: 'app-edit-bg',
    templateUrl: './editBg.component.html',
    styleUrls: ['./editBg.component.css']
})
export class EditBgComponent {
    @Output() selectBg: EventEmitter<any> = new EventEmitter();

    private industryColors = [
        { className: 'color1', bgColor: '#44ACFF' },
        { className: 'color2', bgColor: '#8744FF' },
        { className: 'color3', bgColor: '#29D0A7' },
        { className: 'color4', bgColor: '#FFDA44' },
        { className: 'color5', bgColor: '#1363D1' },
        { className: 'color6', bgColor: '#D0299C' },
        { className: 'color7', bgColor: '#8DB100' },
        { className: 'color8', bgColor: '#FF44BF' },
        { className: 'color9', bgColor: '#D0292E' },
        { className: 'color10', bgColor: '#8DB100' },
        { className: 'color11', bgColor: '#FF44BF' },
        { className: 'color12', bgColor: '#783637' },
        { className: 'color13', bgColor: '#0A301D' },
        { className: 'color14', bgColor: '#B28A8A' },
        { className: 'color15', bgColor: '#BC0000' },
        { className: 'color16', bgColor: '#BC13D1' }
    ];

    private bgOptions = [
        { 'src': 'assets/images/bg/1.jpeg' },
        { 'src': 'assets/images/bg/2.jpeg' },
        { 'src': 'assets/images/bg/3.jpeg' },
        { 'src': 'assets/images/bg/4.jpeg' },
        { 'src': 'assets/images/bg/5.jpeg' },
        { 'src': 'assets/images/bg/6.jpeg' },
        { 'src': 'assets/images/bg/7.jpeg' },
        { 'src': 'assets/images/bg/8.jpeg' },
        { 'src': 'assets/images/bg/9.jpeg' },
        { 'src': 'assets/images/bg/10.jpeg' },
        { 'src': 'assets/images/bg/11.jpeg' },
        { 'src': 'assets/images/bg/12.jpeg' },
        { 'src': 'assets/images/bg/13.jpeg' },
        { 'src': 'assets/images/bg/14.jpeg' },
        { 'src': 'assets/images/bg/15.jpeg' },
        { 'src': 'assets/images/bg/16.jpeg' },
        { 'src': 'assets/images/bg/17.jpeg' },
        { 'src': 'assets/images/bg/18.jpeg' },
        { 'src': 'assets/images/bg/19.jpeg' },
        { 'src': 'assets/images/bg/20.jpeg' },
        { 'src': 'assets/images/bg/21.jpeg' },
        { 'src': 'assets/images/bg/22.jpeg' },
        { 'src': 'assets/images/bg/23.jpeg' },
        { 'src': 'assets/images/bg/24.jpeg' },
        { 'src': 'assets/images/bg/27.jpeg' },
        { 'src': 'assets/images/bg/28.jpeg' }
    ];

    changeBg(item) {
        this.selectBg.emit({
            type: BusinessType.Bg,
            options: item
        });
    }
}
