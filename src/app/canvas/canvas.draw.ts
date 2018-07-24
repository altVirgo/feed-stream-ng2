
import { Canvas, Group, Object } from 'fabric';
import { CanvasOptions, EleCommonConfig, EleCommonOptions, AlignX, ShadowOptions, DrawConfig, ELeType } from './canvas.interface';
import { CanvasDrawBase } from './canvas.draw.base';

import { CanvasService } from './canvas.service';

import { Defer } from './defer';
import { ImageGlobalConfig, ImageOptions } from './image.interface';
import { TextType, TextOptions, TextGlobalConfig } from './text.interface';
import { DrawHistory } from './history';

import * as _ from 'lodash';

import { saveAs } from 'file-saver';
import * as JSZip from 'JSZip';
import { ClipboardType } from './clipboard.interface';

export class CanvasDraw extends CanvasDrawBase {


    private _this = this;
    private history: DrawHistory;
    constructor(id: string, options: CanvasOptions, config: DrawConfig, canvasService: CanvasService) {
        super(id, options, config, canvasService);
        this.canvas = new this.fabric.Canvas(id, options);
        this.history = new DrawHistory(this.canvas, config.maxRecordLen);
    }

    setOption() { }
    getOption() { }

    // 获取当前画布对象
    getCanvas() {
        return this.canvas;
    }

    // 获取画布中处于激活状态的对象
    getActiveObject() {
        this.activeObjs = this.canvas.getActiveObject();
        return this.activeObjs;
    }

    // 重置画布大小
    resizeCanvas(width: number, height: number) {
        this.options.width = width;
        this.options.height = height;
        this.canvas.setDimensions(<fabric.ICanvasDimensions>{ width: width, height: height });
    }

    // 从JSON 数据整体渲染画布
    randerFromJSON(json: any, callback?: Function) {
        if (json && _.isArray(json.objects)) {
            setTimeout(() => {    // 加延时为了解决回退时闪动问题，使画布渲染异步化
                this.canvas.loadFromJSON(JSON.stringify(json), () => {
                    if (callback) { callback(); }
                    this.history.addRecord();
                });
            }, 10);

        }
    }

    // 添加图片
    addImage(value) {
        if (_.isString(value)) {
            return new this.fabric.Image.fromURL(value, (objImage) => {
                this.canvas.add(objImage);
                this.history.addRecord();
            });
        } else {
            const objImage = new this.fabric.Image(value);
            this.canvas.add(objImage);
            this.history.addRecord();
            return objImage;
        }
    }

    // 添加文本
    addtext(options: TextOptions) {
        switch (options.textType) {
            case TextType.headTitle:
                options.fontSize = 40;
                break;
            case TextType.subTitle:
                options.fontSize = 24;
                break;
            case TextType.text:
                options.fontSize = 12;
                break;
            default:
                options.fontSize = 12;
                break;
        }
        const objText = new this.fabric.Textbox(options.text, options);
        this.canvas.add(objText);
        this.history.addRecord();
        return objText;
    }

    // 添加元素组到画布  PS：根据素材图片地址获取相关的json数据并解析
    addGroup(json) {
        if (json && _.isArray(json.objects)) {
            this.getGroupFromJSON(json);
        }
    }

    // 从JSON数据中获取元素组
    getGroupFromJSON(json) {
        const pGetELe = [];
        json.objects.forEach(item => {
            const defer: Defer = new Defer();
            switch (item.type) {
                case 'image':
                    this.fabric.Image.fromObject(item, objImg => {
                        defer.resolve(objImg);
                    });
                    break;
                case 'textbox':
                    this.fabric.Textbox.fromObject(item, objText => {
                        defer.resolve(objText);
                    });
                    break;
                default:
                    defer.resolve(true);
                    break;
            }
            pGetELe.push(defer.promise);
        });
        Promise.all(pGetELe).then((all: any[]) => {
            if (all.length) {
                const group: Group = new this.fabric.Group(all);
                this.canvas.add(group);
                this.history.addRecord();
            }
        });
        return Promise.all(pGetELe);
    }

    // 背景替换
    changeBg(options) {
        if (_.isString(options)) {  // 背景色
            this.canvas.setBackgroundImage('assets/images/tansBg.jpg', this.canvas.renderAll.bind(this.canvas), {
                opacity: 0,
            });
            this.canvas.setBackgroundColor(options, this.canvas.renderAll.bind(this.canvas));
        } else {   // 背景图
            this.canvas.setBackgroundImage(options.src, this.canvas.renderAll.bind(this.canvas), {
                width: this.canvas.getWidth(),
                height: this.canvas.getHeight(),
                originX: 'left',
                originY: 'top'
            });
        }
        this.history.addRecord();
    }

    // 置底
    setEleBottom() {
        if (this.activeObjs) {
            this.activeObjs.sendToBack();
            this.history.addRecord();
        }
    }

    // 置顶
    setEleTop() {
        if (this.activeObjs) {
            this.activeObjs.bringToFront();
            this.history.addRecord();
        }
    }

    // 横向翻转
    flipHorizontal() {
        if (this.activeObjs) {
            this.activeObjs.set('flipX', !this.activeObjs.flipX);
            this.canvas.renderAll();
            this.history.addRecord();
        }
    }

    // 纵向翻转
    flipVertical() {
        if (this.activeObjs) {
            this.activeObjs.set('flipY', !this.activeObjs.flipY);
            this.canvas.renderAll();
            this.history.addRecord();
        }
    }

    // 移除某个元素/当前激活状态的元素
    removeEle(ele?, isRecord?: boolean) {
        if (ele) {
            if (_.isArray(ele)) {
                ele.forEach(item => {
                    this.canvas.remove(item);
                });
            } else {
                this.canvas.remove(ele);
            }
        } else if (this.activeObjs) {
            const activeObjs = (<any>this.canvas).getActiveObjects();
            activeObjs.forEach(item => {
                this.canvas.remove(item);
            });
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
        if (isRecord !== false) {
            this.history.addRecord();
        }
    }

    // 锁定元素
    switchLock() {
        const activeObjs = (<any>this.canvas).getActiveObjects();
        if (this.activeObjs) {
            const locked = this.activeOptions.locked = !this.activeOptions.locked;
            activeObjs.forEach(item => {
                item.set({
                    'lockMovementY': locked,
                    'lockMovementX': locked,
                    'lockRotation': locked,
                    'lockScalingX': locked,
                    'lockScalingY': locked,
                    'lockSkewingX': locked,
                    'lockSkewingY': locked,
                    'lockUniScaling': locked,
                    'hasControls': !locked
                });
            });
            this.history.addRecord();
        }
    }

    // 按比例缩放
    changeZoom(percent: number) {
        if (percent >= this.config.maxZoom) {
            percent = this.config.maxZoom;
        } else if (percent < this.config.minZoom) {
            percent = this.config.minZoom;
        }
        this.canvas.setZoom(percent);
        this.canvas.setDimensions(<fabric.ICanvasDimensions>{
            width: this.options.width * percent,
            height: this.options.height * percent
        });
        this.options.zoom = percent;
    }

    // 获取当前所选元素的属性
    getOptions() {
        const __this = this;
        let defaultOptions: any;
        if (this.activeObjs) {
            switch (this.activeObjs.type) {
                case 'activeSelection':
                    this.getActivesCommonOptions();
                    break;
                case 'group':
                    defaultOptions = this.getDefaultCommonOptions();
                    this.activeOptions = _.forEach(defaultOptions, (value, key) => {
                        defaultOptions[key] = __this.activeObjs[key] ? __this.activeObjs[key] : value;
                    });
                    break;
                case 'textbox':
                    defaultOptions = this.getDefaultTextOptions();
                    this.activeOptions = _.forEach(defaultOptions, (value, key) => {
                        defaultOptions[key] = __this.activeObjs[key] ? __this.activeObjs[key] : value;
                    });
                    break;
                case 'image':
                    defaultOptions = this.getDefaultImageOptions();
                    this.activeOptions = _.forEach(defaultOptions, (value, key) => {
                        defaultOptions[key] = __this.activeObjs[key] ? __this.activeObjs[key] : value;
                    });
                    break;
                default:
                    break;
            }
        } else {
            this.activeOptions = {
                shadow: {
                    color: '#000000',
                    blur: 0,
                    offsetX: 0,
                    offSetY: 0
                }
            };
        }
        console.log('this.activeOptions', this.activeOptions);
        this.activeOptions.locked = this.getActiveLockStatus();
        return this.activeOptions;
    }

    // 设置当前所选元素的属性  支持批量
    setOptions(key, value, callback) {

    }

    // 获取对象数组得相同属性，不相同的使用默认值
    private getActivesCommonOptions() {
        const activeObjs: fabric.Object[] = (<any>this.canvas).getActiveObjects();
        const activeObjLen: number = activeObjs.length;
        const types: string[] = _.uniq(_.map(activeObjs, 'type'));

        let defaultOptions = this.getDefaultCommonOptions();
        if (types.length === 1) {
            if (types[0] === 'image') {
                defaultOptions = this.getDefaultImageOptions();
            } else if (types[0] === 'textbox') {
                defaultOptions = this.getDefaultTextOptions();
            }
        }
        _.flatMap(defaultOptions, (value, key) => {
            this.activeOptions[key] = (_.uniq(_.map(activeObjs, key)).length >= activeObjLen)
                || !activeObjs[0][key] ? value : activeObjs[0][key];
        });
    }

    // 获取当前对象的锁定状态
    private getActiveLockStatus() {
        const _activeOptions = this.activeOptions;
        const locked = _activeOptions.lockMovementY && _activeOptions.lockMovementX &&
            _activeOptions.lockRotation && _activeOptions.lockScalingX &&
            _activeOptions.lockScalingY && _activeOptions.lockSkewingX &&
            _activeOptions.lockSkewingY && _activeOptions.lockUniScaling;
        return locked;
    }

    // 获取默认的公共配置
    private getDefaultCommonConfig(): EleCommonConfig {
        return {
            lockScalingFlip: false,        // 当“true”时，对象不能通过缩放到负值来翻转
            paintFirst: '',              // 确定是否首先绘制填充或描边（"fill" 或 "stroke"之一）
            perPixelTargetFind: false,     // 当设置为“true”时，在画布上以像素为基础“找到”对象，而不是根据边界框
            strokeDashArray: [''],  // 指定对象笔划的短划线模式的数组（笔划必须定义）
            strokeLineCap: '',           // 一个对象笔画的线条结尾风格（ "butt", "round", "square"之一）
            strokeLineJoin: '',          // 一个物体笔划的角落样式（“bevil”，“round”，“Mitre”之一）
            strokeMiterLimit: 1,        // 对象笔画的最大斜接长度（用于strokeLineJoin =“miter”）
            transparentCorners: false    // 如果为true，则对象的控制角将在内部呈现为透明（即笔触而不是填充）
        };
    }

    // 获取默认的公共属性
    private getDefaultCommonOptions(): EleCommonOptions {
        return _.extend({
            type: ELeType.image,             // 类型名称
            width: 0,           // 宽度
            height: 0,           // 高度
            angle: 0,            // 物体的旋转角度（度）
            visible: false,         // 设置为“false”时，对象不会呈现在画布上,
            opacity: 0,          // 物体的不透明度
            flipX: false,           // 如果为true，则将对象呈现为水平翻转
            flipY: false,           // 如果为true，则将对象呈现为水平翻转
            originX: 'left',          // 对象转换的水平原点（"left", "right", "center"之一）
            originY: 'top',          // 对象转换的水平原点（ "top", "bottom", "center"之一）
            padding: 0,          // 对象与其控制边框之间的填充（以像素为单位）
            left: 0,    // 物体的左侧位置。请注意，默认情况下它是相对于左侧的对象。你可以通过设置originX = {left / center / right}
            top: 0,     // 物体的顶部位置。请注意，默认情况下，它是相对于对象顶部。你可以通过设置originY = {top / center / bottom}
            scaleX: 0,           //    对象比例因子（水平）
            scaleY: 0,           //    对象比例因子（垂直）
            skewX: 0,            // 物体x轴上的倾斜角度（以度为单位）
            skewY: 0,            // 物体y轴上的倾斜角度（以度为单位）
            selectable: false,      // 设置为“false”时，不能选择对象进行修改（使用基于点击或基于组的选择）。但是事件仍然在激化。
            shadow: {
                color: '#000000',
                blur: 0,
                offsetX: 0,
                offSetY: 0
            },
            stroke: null,           // 定义时，通过笔划呈现对象，此属性指定其颜色
            strokeWidth: 0,     // 行程的宽度。对于图像质量，2的笔画倍数会得到更好的结果。
            backgroundColor: null,  // 对象的背景颜色
            lockMovementX: false,   // 当“true”时，对象水平移动被锁定
            lockMovementY: false,   // 当“true”时，对象水平移动被锁定
            lockRotation: false,    // 当“true”时，对象旋转被锁定
            lockScalingX: false,    // 当“true”时，对象水平缩放被锁定
            lockScalingY: false,    // 当“true”时，对象垂直缩放被锁定
            lockSkewingX: false,    // 当“true”时，对象水平偏移被锁定
            lockSkewingY: false,    // 当“true”时，对象垂直偏移被锁定
            lockUniScaling: false,  // 当“true”时，对象非一致缩放被锁定
            locked: false,
            minScaleLimit: 0.1,    // 对象的最小允许缩放值
            hasControls: true
        }, this.getDefaultCommonConfig());
    }

    // 获取默认的文字配置
    private getDefaultTextConfig(): TextGlobalConfig {
        return _.extend({
            cornerColor: '',              // 控制对象角落的颜色（当它处于活动状态时）
            cornerDashArray: [''],   // 指定对象控件的虚线模式的数组（hasBorder必须为true）
            cornerSize: 0,               // 对象的控制角的大小（以像素为单位）
            cornerStrokeColor: '',        // 控制对象角点的颜色（当它处于活动状态并且transparentCorners为false时）
            cornerStyle: '',              // 指定控制风格，'rect'或'circle'
            borderScaleFactor: 0,        // 对象的控制边界的比例因子
            borderOpacityWhenMoving: 0,  // 当对象处于活动状态并移动时，对象的控制边框的不透明度
            borderColor: '',              // 控制对象边框的颜色（当它处于活动状态时）
            borderDashArray: [''],   // 指定对象边框的短划线模式的数组（hasBorder必须为true）
            hasBorders: false,              // 当设置为false时，对象的控制边界不会被渲染
            hasRotatingPoint: false,        // 当设置为“false”时，对象的控制旋转点将不可见或可选
            hoverCursor: '',              // 悬停在画布上的此对象时使用的默认游标值
            moveCursor: '',               // 在画布上移动此对象时使用的默认游标值
            selectionBackgroundColor: '' // 选择对象的背景颜色。活动时，物体后面的彩色图层。与globalCompositeOperation方法不搭配。
        }, this.getDefaultCommonConfig());
    }

    // 获取默认的文字属性
    private getDefaultTextOptions(): TextOptions {
        return _.extend({
            text: '',                    // 文字内容
            textType: TextType.text,             // 文字类型
            fontSize: 12,               // 文字尺寸
            fontFamily: '',             // 文字字体
            fontWeight: '',             // 文字加粗
            underline: false,             // 文字下划线
            linethrough: false,           // 文字中划线
            overline: false,              // 文字上划线
            fontStyle: '',              // 文字斜体 normal or italic
            textAlign: '',              // 文字水平对齐方式"left", "center", and "right"
            lineHeight: 1,             // 文字行高
            charSpacing: 0,
            backgroundColor: '',
            textBackgroundColor: '',   // 文字背景颜色
            fill: ''                     // 文字颜色
        }, this.getDefaultTextConfig(), this.getDefaultCommonOptions());
    }

    // 获取默认的图片配置
    private getDefaultImageConfig(): ImageGlobalConfig {
        return _.extend({
            cornerColor: '',              // 控制对象角落的颜色（当它处于活动状态时）
            cornerDashArray: [''],   // 指定对象控件的虚线模式的数组（hasBorder必须为true）
            cornerSize: 0,               // 对象的控制角的大小（以像素为单位）
            cornerStrokeColor: '',        // 控制对象角点的颜色（当它处于活动状态并且transparentCorners为false时）
            cornerStyle: '',              // 指定控制风格，'rect'或'circle'
            borderScaleFactor: 0,        // 对象的控制边界的比例因子
            borderOpacityWhenMoving: 0,  // 当对象处于活动状态并移动时，对象的控制边框的不透明度
            borderColor: '',              // 控制对象边框的颜色（当它处于活动状态时）
            borderDashArray: [''],   // 指定对象边框的短划线模式的数组（hasBorder必须为true）
            hasBorders: false,              // 当设置为false时，对象的控制边界不会被渲染
            hasRotatingPoint: false,        // 当设置为“false”时，对象的控制旋转点将不可见或可选
            hoverCursor: '',              // 悬停在画布上的此对象时使用的默认游标值
            moveCursor: '',               // 在画布上移动此对象时使用的默认游标值
            selectionBackgroundColor: '' // 选择对象的背景颜色。活动时，物体后面的彩色图层。与globalCompositeOperation方法不搭配。
        }, this.getDefaultCommonConfig());
    }

    // 获取默认的图片属性
    private getDefaultImageOptions(): ImageOptions {
        return _.extend({
            src: '',
            cacheKey: '',             // 键用于从2.0.0开始检索表示此图像的纹理
            centeredRotation: false,    // 如果为true，则此对象将通过控件旋转时使用中心点作为转换的原点。 向后不兼容性注释：此属性取代“centerTransform”（布尔）。
            centeredScaling: false,     // 如果为true，则此对象在通过控件缩放时将使用中心点作为转换的原点。 向后不兼容性注释：此属性取代“centerTransform”（布尔）。
            cropX: null,                // 图像以原始图像大小的像素裁剪。自2.0.0起
            cropY: null,                // 图像以原始图像大小的像素裁剪。自2.0.0起
            evented: false,             // 当设置为“false”时，对象不能成为事件的目标。所有事件都通过它传播。在v1.3.4中引入
            fill: '',                 // 物体填充的颜色
            hasControls: false         // 设置为“false”时，对象的控件不显示，不能用于操作对象
        }, this.getDefaultTextConfig(), this.getDefaultCommonOptions());
    }

    // 加粗切换
    switchBold() {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        const _status = this.activeOptions.fontWeight === 'bold' ? 'normal' : 'bold';
        activeObjs.forEach(item => {
            item.set('fontWeight', _status);
        });
        this.activeOptions.fontWeight = _status;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 斜体切换
    switchItalic() {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        const _status = this.activeOptions.fontStyle === 'italic' ? 'normal' : 'italic';
        activeObjs.forEach(item => {
            item.set('fontStyle', _status);
        });
        this.activeOptions.fontStyle = _status;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 下划线切换
    switchUnderline() {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        const _status = !this.activeOptions.underline;
        activeObjs.forEach(item => {
            item.set('underline', _status);
        });
        this.activeOptions.underline = _status;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 中划线切换
    switchLinethrough() {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        const _status = !this.activeOptions.linethrough;
        activeObjs.forEach(item => {
            item.set('linethrough', _status);
        });
        this.activeOptions.linethrough = _status;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 上划线划线切换
    switchOverline() {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        const _status = !this.activeOptions.overline;
        activeObjs.forEach(item => {
            item.set('overline', _status);
        });
        this.activeOptions.overline = _status;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置对齐方式
    setTextAlign(type: AlignX) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('textAlign', type);
        });
        this.activeOptions.textAlign = type;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置文字颜色
    setTextColor(color: string) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('fill', color);
        });
        this.activeOptions.fill = color;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置文字大小
    setTextSize(size: number) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('fontSize', size);
        });
        this.activeOptions.fontSize = size;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置行高
    setLineHeight(height: number) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('lineHeight', height);
        });
        this.activeOptions.lineHeight = height;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置字体
    setFontFamily(fontFamily: string) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('fontFamily', fontFamily);
        });
        this.activeOptions.fontFamily = fontFamily;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置背景颜色
    setBackgroundColor(color: string) {
        if (!this.activeObjs) {
            this.activeOptions.backgroundColor = null;
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('backgroundColor', color);
        });
        this.activeOptions.backgroundColor = color;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置文字背景颜色
    setTextBackgroundColor(color: string) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('textBackgroundColor', color);
        });
        this.activeOptions.textBackgroundColor = color;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置透明度
    setOpacity(opacity: number) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('opacity', opacity);
        });
        this.activeOptions.opacity = opacity;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置字间距
    setCharSpacing(spacing: number) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('charSpacing', spacing);
        });
        this.activeOptions.charSpacing = spacing;
        this.canvas.renderAll();
        this.history.addRecord();
    }


    // 设置边框颜色
    setStroke(color: string) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('stroke', color);
        });
        this.activeOptions.stroke = color;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置边框宽度
    setStrokeWidth(width: number) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        activeObjs.forEach(item => {
            item.set('strokeWidth', width);
        });
        this.activeOptions.strokeWidth = width;
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 设置阴影
    setShadow(shadow: ShadowOptions | String) {
        if (!this.activeObjs) {
            return;
        }
        const activeObjs = (<any>this.canvas).getActiveObjects();
        this.activeOptions.shadow = _.extend(this.activeOptions.shadow, shadow);
        activeObjs.forEach(item => {
            item.setShadow(this.activeOptions.shadow);
        });
        this.canvas.renderAll();
        this.history.addRecord();
    }

    // 获取历史记录对象
    getDrawHistory() {
        return this.history;
    }

    // 历史记录：后退
    toPrevious() {
        this.history.toPrevious();
    }

    // 历史记录：前进
    toNext() {
        this.history.toNext();
    }

    // 历史记录：最初的状态
    reset() {
        this.history.reset();
    }

    // 转化成图片，返回一个base64字符串
    toImg(options?) {
        return this.canvas.toDataURL(options);
    }

    // 导出
    export(docName?: string) {
        const zip = new JSZip();
        const folder = zip.folder(docName);

        zip.file('data.json', JSON.stringify((<any>this.canvas).toJSON()));
        folder.file('img.png', this.canvas.toDataURL().replace('data:image/png;base64,', ''), { base64: true });

        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, docName);
        });
    }

    // 复制
    copy() {
        const activeOptions = (<any>this.canvas).getActiveObjects();
        this.canvasService.clipboard = {
            obj: activeOptions,
            top: this.activeObjs.top,
            left: this.activeObjs.left,
            type: ClipboardType.copy
        };
    }

    // 粘贴
    paste() {
        if (!this.canvasService.clipboard.obj || this.canvasService.clipboard.obj.length < 0) {
            return;
        }
        let setoff;
        if (this.canvasService.clipboard.type === ClipboardType.copy) {
            setoff = 10;
        } else {
            setoff = 0;
        }

        if (this.canvasService.clipboard.obj.length > 1) {
            this.removeEle(null, false);         //
            const group = new this.fabric.Group(this.canvasService.clipboard.obj, {
                left: this.canvasService.clipboard.left,
                top: this.canvasService.clipboard.top
            });
            this.canvas.add(group);     // 配合删除一起解决group不能被选中操作的问题

            group.clone((obj) => {
                obj.left = this.canvasService.clipboard.left + setoff;
                obj.top = this.canvasService.clipboard.top + setoff;
                this.canvas.add(obj);

            // (<any>group).toActiveSelection();
            // (<any>this.canvas).requestRenderAll();

                (<any>obj).toActiveSelection();

                if (this.canvasService.clipboard.type === ClipboardType.copy) {
                    this.canvasService.clipboard = {
                        obj: (<any>this.canvas).getActiveObjects(),
                        left: obj.left,
                        top: obj.top,
                        type: ClipboardType.copy
                    };
                } else {
                    this.canvasService.clipboard = {};
                }

                this.activeObjs = this.canvas.getActiveObject();
                this.canvas.renderAll();
                this.history.addRecord();


            });

        } else if (this.canvasService.clipboard.obj.length = 1) {
            this.canvasService.clipboard.obj[0].clone((obj) => {
                obj.left = obj.left + setoff;
                obj.top = obj.top + setoff;
                this.canvas.add(obj);

                if (this.canvasService.clipboard.type === ClipboardType.copy) {
                    this.canvasService.clipboard.obj = [obj];
                } else {
                    this.canvasService.clipboard = {};
                }

                this.canvas.setActiveObject(obj);
                this.activeObjs = this.canvas.getActiveObject();
                this.history.addRecord();
            });
        }
    }

    // 剪切
    cut() {
        const activeOptions = (<any>this.canvas).getActiveObjects();
        this.canvasService.clipboard = {
            obj: activeOptions,
            top: this.activeObjs.top,
            left: this.activeObjs.left,
            type: ClipboardType.cut
        };
        this.removeEle(null, false);

        this.history.addRecord();
    }
}
