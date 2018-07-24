import { Canvas, Image, Group } from 'fabric';
import { Observable } from 'rxjs/Observable';
import { CanvasOptions, AlignX, ShadowOptions, DrawConfig } from './canvas.interface';

import * as fabric from 'fabric';
import { TextOptions } from './text.interface';
import { CanvasService } from './canvas.service';

export abstract class CanvasDrawBase {
    protected fabric: any;
    protected canvas: Canvas;
    public activeObjs;
    protected activeOptions;

    public constructor(
        protected id: string,
        protected options: CanvasOptions,
        protected config: DrawConfig,
        protected canvasService: CanvasService) {
        this.fabric = (<any>fabric).fabric;
    }

    /**
     * 设置当前所选元素的属性  支持批量
     */
    protected abstract setOptions(key: string, value: any, callback: Function);

    /**
     * 获取当前所选元素的属性  支持批量
     */
    protected abstract getOptions();

    // protected abstract getActivesCommonOptions();
    // protected abstract getActiveLockStatus();
    // protected abstract getDefaultCommonConfig();
    // protected abstract getDefaultCommonOptions();
    // protected abstract getDefaultTextConfig();
    // protected abstract getDefaultTextOptions();
    // protected abstract getDefaultImageConfig();
    // protected abstract getDefaultImageOptions();

    /**
     * 获取当前画布对象
     */
    protected abstract getCanvas();

    /**
     * 获取画布中处于激活状态的对象
    */
    public abstract getActiveObject();

    /**
     * 重置画布大小
     * @param width
     * @param height
     */
    public abstract resizeCanvas(width: number, height: number);

    /**
     * 从JSON 数据整体渲染画布
     * @param json
     */
    public abstract randerFromJSON(json, calback?: Function);

    /**
     * 在画布中新增一张图片
     * @param value
     */
    public abstract addImage(value: string | any);

    /**
     * 在画布中新增文字框
     * @param value
     * @param type
     */
    public abstract addtext(addtext: TextOptions);

    /**
     * 从json数据中获取 元素组 并添加到画布
     * @param json
     */
    public abstract addGroup(json: any);

    /**
     * 背景替换
     * @param value
     */
    public abstract changeBg(value);

    /**
     * 置底
     */
    public abstract setEleBottom();

    /**
     * 置顶
     */
    public abstract setEleTop();


    /**
     * 横向翻转
     */
    public abstract flipHorizontal();

    /**
     * 纵向翻转
     */
    public abstract flipVertical();

    /**
     * 移除某个元素/当前激活状态的元素
     * @param ele
     */
    public abstract removeEle(isRecord?: boolean);

    /**
     * 锁定元素
     */
    public abstract switchLock();

    /**
     * 按百分比放缩
     * @param percent
     */
    public abstract changeZoom(percent: number);

    /**
     * 加粗切换
     */
    public abstract switchBold();

    /**
     * 斜体切换
     */
    public abstract switchItalic();

    /**
     * 下划线切换
     */
    public abstract switchUnderline();

    /**
     * 中划线切换
     */
    public abstract switchLinethrough();

    /**
     * 上划线划线切换
     */
    public abstract switchOverline();

    /**
     * 设置对齐方式
     * @param type
     */
    public abstract setTextAlign(type: AlignX);

    /**
     * 设置文字颜色
     * @param color
     */
    public abstract setTextColor(color: string);

    /**
    * 设置文字大小
     * @param size
    */
    public abstract setTextSize(size: number);

    /**
     * 设置行高
     * @param height
     */
    public abstract setLineHeight(height: number);

    /**
     * 设置字体
     * @param fontFamily
     */
    public abstract setFontFamily(fontFamily: string);

    /**
     * 设置背景颜色
     * @param color
     */
    public abstract setBackgroundColor(color: string);

    /**
     * 设置背景颜色
     * @param color
     */
    public abstract setTextBackgroundColor(color: string);


    /**
     * 设置透明度
     * @param opacity
     */
    public abstract setOpacity(opacity: number);


    /**
     * 设置字间距
     * @param spacing
     */
    public abstract setCharSpacing(spacing: number);

    /**
     * 设置边框颜色
     * @param color
     */
    public abstract setStroke(color: string);


    /**
     * 设置边框宽度
     * @param width
     */
    public abstract setStrokeWidth(width: number);

    /**
     * 设置阴影
     * @param shadow
     */
    public abstract setShadow(shadow: ShadowOptions | String);

    /**
     * 获取历史对象
     */
    public abstract getDrawHistory();

    /**
     * 历史记录：后退
     */
    public abstract toPrevious();

    /**
     * 历史记录：前进
     */
    public abstract toNext();

    /**
     * 历史记录：最初的状态
     */
    public abstract reset();

    /**
     * 转化成图片，返回一个base64字符串
     */
    public abstract toImg(options?);

    /**
     * 导出
     * @param name
     */
    public abstract export(docName?: string);


    /**
     * 复制
     */
    public abstract copy();

    /**
     * 粘贴
     */
    public abstract paste();

    /**
     * 剪切
     */
    public abstract cut();
}
