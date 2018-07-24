import { Component, Output, EventEmitter } from '@angular/core';
import { BusinessType } from '../editPic.interface';

@Component({
    selector: 'app-edit-graph',
    templateUrl: './editGraph.component.html',
    styleUrls: ['./editGraph.component.css']
})
export class EditGraphComponent {
    @Output() selectGraph: EventEmitter<any> = new EventEmitter();

    private graphOptions = [
        { 'src': 'assets/images/graph/1.png' },
        { 'src': 'assets/images/graph/2.png' },
        { 'src': 'assets/images/graph/3.png' },
        { 'src': 'assets/images/graph/4.png' },
        { 'src': 'assets/images/graph/5.png' },
        { 'src': 'assets/images/graph/6.png' },
        { 'src': 'assets/images/graph/7.png' },
        { 'src': 'assets/images/graph/8.png' },
        { 'src': 'assets/images/graph/9.png' },
        { 'src': 'assets/images/graph/10.png' },
        { 'src': 'assets/images/graph/11.png' },
        { 'src': 'assets/images/graph/12.png' },
        { 'src': 'assets/images/graph/13.png' },
        { 'src': 'assets/images/graph/16.png' },
        { 'src': 'assets/images/graph/17.png' },
        { 'src': 'assets/images/graph/18.png' },
        { 'src': 'assets/images/graph/19.png' },
        { 'src': 'assets/images/graph/20.png' },
        { 'src': 'assets/images/graph/21.png' },
        { 'src': 'assets/images/graph/22.png' },
        { 'src': 'assets/images/graph/23.png' },
        { 'src': 'assets/images/graph/24.png' },
        { 'src': 'assets/images/graph/25.png' },
        { 'src': 'assets/images/graph/26.png' },
        { 'src': 'assets/images/graph/27.png' },
        { 'src': 'assets/images/graph/28.png' },
        { 'src': 'assets/images/graph/29.png' }
    ];

    addEle(item) {
        this.selectGraph.emit({
            type: BusinessType.Graph,
            options: item
        });
    }
}
