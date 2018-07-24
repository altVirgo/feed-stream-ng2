import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { LeftMenu, BusinessType, TextType } from './editPic.interface';

import { Defer } from '../shared/class/defer';

import { CanvasService } from '../canvas/canvas.service';
import { CanvasDraw } from '../canvas/canvas.draw';
import { CanvasOptions, DrawConfig } from '../canvas/canvas.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import * as _ from 'lodash';
import { EditPicService } from './defaultData.service';
import { DialogService } from '../shared/services/modal.service';

import { EditPicNameComponent } from '../editPic/dialog/editPicName/editPicName.component';
import { PreviewComponent } from './dialog/preview/preview.component';

@Component({
    selector: 'app-edit-pic',
    templateUrl: './editPic.component.html',
    styleUrls: ['./editPic.component.css', '../canvas/fontFamily/family.css']
})

export class EditPicComponent implements OnInit, OnChanges, AfterViewInit {

    private curShowType: String;                // 当前显示的业务
    private menus: LeftMenu[] = [];             // 左侧菜单配置
    private sizeOptions: any[] = [];            // 编辑区尺寸下拉菜单配置
    private canvasOptions: CanvasOptions;       // 画布属性
    private canvasConfig: DrawConfig;           // 画图配置
    private fontFamilysList;                    // 字体列表

    private prePercent: number;

    private languageType;
    // 顶部工具条种 隐藏功能的显示/隐藏状态
    private showStatus = {
        transparent: false,
        spacing: false,
        shadow: false,
        stroke: false,
        switch: (e, key) => {
            e.stopPropagation();
            _.extend(this.showStatus, {
                transparent: false,
                spacing: false,
                shadow: false,
                stroke: false
            });
            this.showStatus[key] = !this.showStatus[key];
        }
    };

    private activeOptions = {};

    private canvas: CanvasDraw;

    constructor(private dataServer: EditPicService,
        private translate: TranslateService,
        private http: Http,
        private canvasService: CanvasService,
        private dialog: DialogService
    ) {

    }

    ngOnInit() {
        this.initData();
        this.initEventBind();
    }

    ngAfterViewInit() {
        this.canvas = this.canvasService.getCanvas('canvas');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes', changes, this.canvasService.clipboard);
    }

    trackByTemp(index: number, item: any) {
        return item.id;
    }

    initEventBind() {
        Observable.fromEvent(document, 'click')
            .subscribe((event) => {
                this.showStatus = _.extend(this.showStatus, {
                    transparent: false,
                    spacing: false,
                    shadow: false,
                    stroke: false
                });
            });
    }

    // 初始化默认数据
    initData() {
        this.menus = this.dataServer.menus;
        this.curShowType = this.menus[0].type;
        this.sizeOptions = this.dataServer.sizeOptions;
        this.canvasOptions = this.dataServer.canvasDefaultOptions;
        this.canvasConfig = this.dataServer.canvasDefaultConfig;
        this.fontFamilysList = this.dataServer.fontFamilysList;
        this.prePercent = 0.1;
    }

    // 选择尺寸后
    onPicSizeChange(value) {
        this.curShowType = BusinessType.Template;
        this.canvasOptions = _.extend(this.canvasOptions, value);
        if (value.type === 1) {
            this.canvasOptions.width = value.width * 3;
        }
        this.canvas.resizeCanvas(this.canvasOptions.width, this.canvasOptions.height);
    }

    // 选择某个素材
    onSelectEle(value) {
        let eleObj;
        let dataSrc = '';
        switch (value.type) {
            case BusinessType.Template:
                dataSrc = value.options.src.replace('img.png', 'data.json');
                this.http.get(dataSrc).subscribe((res: any) => {
                    const json = res.json();
                    this.canvas.randerFromJSON(json);
                });
                break;
            case BusinessType.Image:
                this.canvas.addImage(value.options.src);
                break;
            case BusinessType.Text:
                if (value.options.text) {  // 单文字
                    this.canvas.addtext(value.options);
                } else {                   // 组合文字
                    dataSrc = value.options.src.replace('img.png', 'data.json');
                    this.http.get(dataSrc).subscribe((res: any) => {
                        const json = res.json();
                        this.canvas.addGroup(json);
                    });
                }
                break;
            case BusinessType.Graph:
                this.canvas.addImage(value.options.src);
                break;
            case BusinessType.Bg:
                this.canvas.changeBg(value.options);
                break;
            case BusinessType.Owned:
                eleObj = this.canvas.addImage(value.options.src);
                break;
            default:
                // throw 'unkown type';
                break;
        }
    }

    // 选中尺寸下拉框的选项（重置画布大小，缩放比例）
    selectSize(value, parentObj) {
        this.canvasOptions.height = value.value.y;
        this.canvasConfig.type = value.type;
        if (value.type === 1) {
            this.canvasOptions.width = value.value.x * 3;
        } else {
            this.canvasOptions.width = value.value.x;
        }
        if (parentObj) {
            this.canvasConfig.plabel = parentObj.label;
        }

        this.canvasConfig.label = value.label;

        this.canvas.resizeCanvas(this.canvasOptions.width, this.canvasOptions.height);
        this.canvasOptions.zoom = 1;
        this.canvas.changeZoom(this.canvasOptions.zoom);
    }

    // 画布缩放
    changeZoom(type) {
        if (type === '-') {
            this.canvasOptions.zoom = this.canvasOptions.zoom - this.prePercent;
        } else {
            this.canvasOptions.zoom = this.canvasOptions.zoom + this.prePercent;
        }
        this.canvas.changeZoom(this.canvasOptions.zoom);
    }

    // 阻止事件冒泡
    stopPropagation(e) {
        e.stopPropagation();
    }

    // 打开对下框提示用户输入 图片名称
    openDialogInputName() {
        this.dialog.open({
            title: this.translate.instant('TIP_INPUT_DOCMENT_NAME'),
            content: EditPicNameComponent
        }).then(data => {
            this.canvas.export(data.name);
        });
    }

    // 预览
    preview() {
        this.dialog.open({
            title: this.translate.instant('BUTTON_PREVIEW'),
            content: PreviewComponent,
            componentParams: {
                data: {
                    src: this.canvas.toImg()
                }
            }
        });
    }

    //
    convertFontFamily(fontFamily: string) {
        return _.result(_.find(this.fontFamilysList, { value: fontFamily }), 'label');
    }
}

