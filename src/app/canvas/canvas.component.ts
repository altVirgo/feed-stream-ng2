import { CanvasDraw } from './canvas.draw';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import * as _ from 'lodash';

import { CanvasOptions, DrawConfig, CanvasType } from './canvas.interface';
import { CanvasService } from './canvas.service';
import { DrawHistory } from './history';

@Component({
    selector: 'app-adv-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit, AfterViewInit {

    @Input() id: string;                          // canvas id

    @Input() config: DrawConfig;                  // 策略配置

    @Input() options: CanvasOptions;              // 画布属性
    @Output() optionsChange: EventEmitter<any> = new EventEmitter();

    @Input() status;
    @Output() statusChange: EventEmitter<any> = new EventEmitter();

    private history: DrawHistory;
    private canvasDraw: CanvasDraw;
    private canvas: fabric.Canvas;

    constructor(protected canvasService: CanvasService) {
    }






    ngOnInit() {
        this.initData();
        this.initEventBind();
    }

    ngAfterViewInit() {
        this.canvasDraw = this.canvasService.addCanvas(this.id, this.options, this.config);
        this.canvas = this.canvasDraw.getCanvas();
        this.history = this.canvasDraw.getDrawHistory();
        this.addCanvasEventBind();
    }

    // 初始化数据
    initData() {
        this.config = _.extend({
            type: CanvasType.singlePic,
            perZoomScroll: 0.01,
            perDisMove: 1,
            perAngleMove: 1,
            plabel: '',
            label: '',
            minZoom: 0.5,
            maxZoom: 2
        }, this.config);

        this.options = _.extend({
            zoom: 1
        }, this.options);

        this.status = _.extend({
            shadow: {
                color: '#000000',
                blur: 0,
                offsetX: 0,
                offSetY: 0
            }
        }, this.status);

        this.optionsChange.emit(this.options);
        this.statusChange.emit(this.status);
    }

    // 添监听鼠标滚动事件
    @HostListener('wheel', ['$event']) onMouseWheel(event: any) {
        event.stopPropagation();
        event.preventDefault();
        let zoom = parseFloat(this.canvas.getZoom().toFixed(2));
        console.log('Event: wheel', event);
        if (event.deltaY < 0) {
            zoom = zoom + this.config.perZoomScroll;
        } else {
            zoom = zoom - this.config.perZoomScroll;
        }
        if (event.ctrlKey && this.canvas) {
            this.canvasDraw.changeZoom(zoom);
        }
    }

    // 初始化事件绑定  主要用于快捷键监听
    initEventBind() {
        Observable.fromEvent(document, 'keydown').subscribe((event: any) => {
            event.stopPropagation();
            console.log('Event：document keydown', event);

            // 画布
            switch (event.key) {
                case 'z':     // Z
                    if (event.shiftKey) {     // Shift + z  撤销
                        this.canvasDraw.toNext();
                    } else if (event.ctrlKey) {     // Ctrl + z  撤销
                        this.canvasDraw.toPrevious();
                    }
                    break;
                case 'v':
                    if (event.ctrlKey) {   // Ctrl + V 粘贴
                        this.canvasDraw.paste();
                    }
                    break;
                default:
                    break;
            }

            // 针对对象
            if (!this.canvasDraw || !this.canvasDraw.activeObjs) {
                return;
            } else {    // 快捷方式
                switch (event.key) {
                    case 'ArrowUp':       // 上
                        if (event.ctrlKey) {     // Ctrl + ArrowUp 向右旋转
                            this.canvasDraw.activeObjs.angle = this.canvasDraw.activeObjs.angle + this.config.perAngleMove;
                            this.canvasDraw.activeObjs.set('angle', this.canvasDraw.activeObjs.angle);
                        } else {                 // ArrowUp 向上移动
                            this.canvasDraw.activeObjs.top = this.canvasDraw.activeObjs.top - this.config.perDisMove;
                            this.canvasDraw.activeObjs.set('top', this.canvasDraw.activeObjs.top);
                        }
                        this.canvas.renderAll();
                        this.history.addRecord();
                        break;
                    case 'ArrowDown':     // 下
                        if (event.ctrlKey) {     // Ctrl + ArrowDown 向左旋转
                            this.canvasDraw.activeObjs.angle = this.canvasDraw.activeObjs.angle - this.config.perAngleMove;
                            this.canvasDraw.activeObjs.set('angle', this.canvasDraw.activeObjs.angle);
                        } else {                 // ArrowDown 向下移动
                            this.canvasDraw.activeObjs.top = this.canvasDraw.activeObjs.top + this.config.perDisMove;
                            this.canvasDraw.activeObjs.set('top', this.canvasDraw.activeObjs.top);
                        }

                        this.canvas.renderAll();
                        this.history.addRecord();
                        break;
                    case 'ArrowRight':    // 右
                        if (event.ctrlKey) {     // Ctrl + ArrowRight 向右旋转
                            this.canvasDraw.activeObjs.angle = this.canvasDraw.activeObjs.angle + this.config.perAngleMove;
                            this.canvasDraw.activeObjs.set('angle', this.canvasDraw.activeObjs.angle);
                        } else {                 // ArrowRight 向右移动
                            this.canvasDraw.activeObjs.left = this.canvasDraw.activeObjs.left + this.config.perDisMove;
                            this.canvasDraw.activeObjs.set('left', this.canvasDraw.activeObjs.left);
                        }
                        this.canvas.renderAll();
                        this.history.addRecord();
                        break;
                    case 'ArrowLeft':     // 左
                        if (event.ctrlKey) {     // Ctrl + ArrowLeft 向左旋转
                            this.canvasDraw.activeObjs.angle = this.canvasDraw.activeObjs.angle - this.config.perAngleMove;
                            this.canvasDraw.activeObjs.set('angle', this.canvasDraw.activeObjs.angle);
                        } else {                 // ArrowLeft 向左移动
                            this.canvasDraw.activeObjs.left = this.canvasDraw.activeObjs.left - this.config.perDisMove;
                            this.canvasDraw.activeObjs.set('left', this.canvasDraw.activeObjs.left);
                        }

                        this.canvas.renderAll();
                        this.history.addRecord();
                        break;
                    case 'x':
                        if (event.ctrlKey) {    // Ctrl + X 剪切
                            this.canvasDraw.cut();
                        }
                        break;
                    case 'c':
                        if (event.ctrlKey) {   // Ctrl + C 复制
                            this.canvasDraw.copy();
                        }
                        break;

                    case 'Delete':       // Delete 删除
                        this.canvasDraw.removeEle();
                        break;
                    default:
                        break;
                }
            }
        });
    }

    // 向实例化的Canvas对象（即当前画布）添加事件绑定
    addCanvasEventBind() {
        this.canvas.on({
            'selection:updated': (e) => {      // 所选对象有更新时
                this.canvasDraw.activeObjs = this.canvas.getActiveObject();
                this.status = this.canvasDraw.getOptions();
                if (this.status) {
                    this.statusChange.emit(this.status);
                }
                console.log('selection:updated', this.canvasDraw.activeObjs, this.status);
            },
            'selection:created': (e) => {      // 第一个对象被选择时
                this.canvasDraw.activeObjs = this.canvas.getActiveObject();
                this.status = this.canvasDraw.getOptions();
                if (this.status) {
                    this.statusChange.emit(this.status);
                }
                console.log('selection:created', this.canvasDraw.activeObjs, this.status);
            },
            'selection:cleared': (e) => {      // 当前所选对象都失焦时
                this.canvasDraw.activeObjs = this.canvas.getActiveObject();
                this.status = this.canvasDraw.getOptions();
                this.statusChange.emit(this.status);
                console.log('selection:cleared', this.canvasDraw.activeObjs, this.status);
            },
            'object:modified': (e) => {        // 有对象被更改时（注意：只监听移动，放缩，旋转等事件，不监听文字加粗，对象阴影等操作）
                this.status = this.canvasDraw.getOptions();
                if (this.status) {
                    this.statusChange.emit(this.status);
                }
                this.history.addRecord();
                console.log('object：modified', this.canvasDraw.activeObjs, this.status);
            },
            'mouse:dblclick': (e) => {        // 双击group对象 打散group
                if (e.target && e.target.type === 'group') {
                    const activeObject = this.canvasDraw.getActiveObject();
                    if (activeObject && activeObject.type === 'group') {
                        (<any>activeObject).toActiveSelection();
                        (<any>this.canvas).requestRenderAll();
                        // this.canvas.discardActiveObject();
                    }
                }
            },
            'after:render': (e) => {          // 画布渲染后触发
                // this.status = this.canvasDraw.getOptions();
                // if (this.status) {
                //     this.statusChange.emit(this.status);
                // }
                // console.log('after:render', this.canvasDraw.activeObjs, this.status);
            }
        });
    }




}
