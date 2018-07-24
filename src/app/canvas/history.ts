import { Canvas, Group } from 'fabric';

import * as _ from 'lodash';

export class DrawHistory {
    private record = [];
    private pointer = -1;
    private maxLength: number;
    constructor(private canvas: Canvas, private maxRecordLen: number) {
        this.maxLength = 50 || maxRecordLen;
    }

    /**
     * 新增一条历史纪录
     */
    public addRecord() {
        if (this.record.length > this.maxLength) {        // 当记录长度大于最大记录长度时，丢弃当前首条历史记录
            this.record.push(JSON.stringify((<any>this.canvas).toJSON()));
            this.record.shift();
            this.pointer = this.maxLength - 1;
        } else {
            if (this.pointer < this.record.length - 1) {    // 当显示为历史记录中间态时，删除当前显示记录之后的记录，不允许用户再回滚
                this.record.splice(this.pointer + 1, this.record.length - 1);
                this.record.push(JSON.stringify((<any>this.canvas).toJSON()));
                this.pointer = this.record.length - 1;
            } else {
                this.record.push(JSON.stringify((<any>this.canvas).toJSON()));
                this.pointer++;
            }
        }
        console.log('Record:  add', this.pointer, this.record);
    }

    /**
     * 历史记录：后退  并渲染画布
     */
    public toPrevious() {
        if (this.pointer - 1 >= 0) {
            this.pointer--;
            this.canvas.loadFromJSON(this.record[this.pointer], () => { });
            console.log('Record:  toPrevious', this.pointer, this.record);
        }
    }

    /**
     * 历史记录：前进  并渲染画布
     */
    public toNext() {
        debugger;
        if (this.pointer + 1 < this.maxLength) {
            this.pointer++;
            this.canvas.loadFromJSON(this.record[this.pointer], () => { });
            console.log('Record:  toNext', this.pointer, this.record);
        }
        return;
    }

    /**
     * 历史记录：返回当前首条历史记录  并渲染画布
     */
    public reset() {
        this.pointer = 0;
        this.canvas.loadFromJSON(this.record[this.pointer], () => { });
        console.log('Record:  reset', this.pointer, this.record);
    }

    /**
     * 清除历史记录
     */
    public clear() {
        this.record = [];
        this.pointer--;
        console.log('Record:  clear', this.pointer, this.record);
    }

}

