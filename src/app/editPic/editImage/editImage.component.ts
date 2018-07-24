import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BusinessType } from '../editPic.interface';

@Component({
    selector: 'app-edit-image',
    templateUrl: './editImage.component.html',
    styleUrls: ['./editImage.component.css']
})
export class EditImageComponent {
    @Output() selectImage: EventEmitter<any> = new EventEmitter();

    private isExpand = true;
    // 图片搜索区 开关
    private switch: any = {
        isPay: false,
        isAutoMatch: false
    };

    // 行业色彩
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

    // 图片素材排序
    private sort: any = {
        byTime: false,
        byHot: false,
        byPrice: false
    };

    private imageOptions = [
        { 'src': 'assets/images/pic/1.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/2.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/7.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/3.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/4.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/8.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/5.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/6.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/10.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/9.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/11.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/3.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/6.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/12.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/12.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/3.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/4.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/8.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/5.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/6.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/10.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/9.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/11.jpg', type: '92x92' },
        { 'src': 'assets/images/pic/3.jpg', type: '184x92' },
        { 'src': 'assets/images/pic/6.jpg', type: '184x92' },
    ];

    addEle(item) {
        this.selectImage.emit({
            type: BusinessType.Image,
            options: item
        });
    }
}
