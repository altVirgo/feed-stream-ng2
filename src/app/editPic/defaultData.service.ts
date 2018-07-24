import { Injectable } from '@angular/core';
import { BusinessType, LeftMenu } from './editPic.interface';
import { CanvasOptions, DrawConfig, CanvasType } from '../canvas/canvas.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EditPicService {
    constructor(private translate: TranslateService) {
    }

    public menus: LeftMenu[] = [
        {
            type: BusinessType.Size,
            label: this.translate.instant('LEFT_MENU_ZISE'),
            iconClass: 'iconfont icon-size'
        },
        {
            type: BusinessType.Template,
            label: this.translate.instant('LEFT_MENU_TEMPLATE'),
            iconClass: 'iconfont icon-temple'
        },
        {
            type: BusinessType.Image,
            label: this.translate.instant('LEFT_MENU_IMAGE'),
            iconClass: 'iconfont icon-image'
        },
        {
            type: BusinessType.Text,
            label: this.translate.instant('LEFT_MENU_TEXT'),
            iconClass: 'iconfont icon-text'
        },
        {
            type: BusinessType.Graph,
            label: this.translate.instant('LEFT_MENU_GRAPH'),
            iconClass: 'iconfont icon-graph'
        },
        {
            type: BusinessType.Bg,
            label: this.translate.instant('LEFT_MENU_BACKGROUND'),
            iconClass: 'iconfont icon-background'
        },
        {
            type: BusinessType.Owned,
            label: this.translate.instant('LEFT_MENU_OWNED'),
            iconClass: 'iconfont icon-upload'
        }
    ];

    public sizeOptions: any[] = [
        {
            label: '浏览器', list: [
                { label: 'APP下载', value: { x: 660, y: 370 }, type: 0 },
                { label: '大图', value: { x: 660, y: 370 }, type: 0 },
                { label: '三图', value: { x: 218, y: 146 }, type: 1 },
            ]

        },
        {
            label: '手机百度', list: [
                { label: '单图', value: { x: 370, y: 245 }, type: 0 },
                { label: '三图', value: { x: 370, y: 245 }, type: 1 },
            ]
        },
        {
            label: '贴吧列表(移动)', list: [
                { label: '单图1', value: { x: 644, y: 280 }, type: 0 },
                { label: '单图2', value: { x: 600, y: 248 }, type: 0 },
                { label: '三图1', value: { x: 190, y: 190 }, type: 1 },
                { label: '三图2', value: { x: 220, y: 220 }, type: 1 },
            ]

        }, {
            label: '贴吧内容(移动)', list: [
                { label: '单图1', value: { x: 644, y: 280 }, type: 0 },
                { label: '单图2', value: { x: 600, y: 248 }, type: 0 },
                { label: '三图1', value: { x: 190, y: 190 }, type: 1 },
                { label: '三图2', value: { x: 220, y: 220 }, type: 1 },
            ]
        },
        {
            label: '贴吧内容(PC)', value: { x: 560, y: 170 }, type: 0
        },
        {
            label: '贴吧列表(PC)', value: { x: 120, y: 90 }, type: 0
        }
    ];

    public canvasDefaultOptions: CanvasOptions = {
        width: 660,
        height: 370,
        zoom: 1,
        perPixelTargetFind: true,
    };

    public canvasDefaultConfig: DrawConfig = {
        type: CanvasType.singlePic,
        plabel: '浏览器',
        label: 'APP下载',
        minZoom: 0.5,
        maxZoom: 2,
        perZoomScroll: 0.03
    };


    public fontFamilysList = [
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'Microsoft YaHei', label: '微软雅黑' },
        // { value: 'Times New Roman', label: 'Times New Roman' },
        // { value: 'chang-cheng-chang-song-ti', label: '长城长宋体' },
        // { value: 'chang-cheng-te-cu-song-ti', label: '长城特粗宋体' },
        // { value: 'han-yi-run-yuan', label: '汉仪润圆' },
        { value: 'han-yi-xiao-mai-ti-jian', label: '汉仪小麦体简' },
        { value: 'han-yi-you-ran-ti-jian', label: '汉仪悠然体简' }
        // , { value: 'qing-diao-hua-guang-jian-bao-song', label: '青鸟华光简报宋' },
        // { value: 'yi-chuang-zhui-ai-ti', label: '羿创追爱体' }
    ];
}
