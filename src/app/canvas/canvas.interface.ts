import { CanvasDraw } from './canvas.draw';

/**
 * 画布属性
 */
export interface CanvasOptions {

    width: number;                 // 画布宽度

    height: number;                // 画布高度

    backgroundImage?: any;         // 背景图

    zoom?: number;                 // 缩放的比例

    backgroundColor?: string;      // 背景颜色

    backgroundVpt?: boolean;       // 如果设置为false背景图像不受视口变换的影响

    perPixelTargetFind?: boolean;  // 如果为true，则以像素为单位进行对象检测，而不是按每个边界框进行检测

}

/**
 * 功能配置
 */
export interface DrawConfig {

    type: CanvasType;        // 画布类型 单图 / 三图

    plabel: string;          // 画布尺寸一级标识

    label?: string;           // 画布尺寸二级标识

    minZoom?: number;         // 最小缩放比例

    maxZoom?: number;         // 最大缩放比例

    perZoomScroll?: number;   // 鼠标每次滚动缩放大小

    perDisMove?: number;      // 键盘控制对象移距离

    perAngleMove?: number;    // 键盘控制对象旋转角度

    maxRecordLen?: number;    // 最大的历史记录条数

}
/**
 * 元素的公共配置
 */
export interface EleCommonConfig {
    lockScalingFlip?: boolean;        // 当“true”时，对象不能通过缩放到负值来翻转
    paintFirst?: string;              // 确定是否首先绘制填充或描边（"fill" 或 "stroke"之一）
    perPixelTargetFind?: boolean;     // 当设置为“true”时，在画布上以像素为基础“找到”对象，而不是根据边界框
    strokeDashArray?: Array<string>;  // 指定对象笔划的短划线模式的数组（笔划必须定义）
    strokeLineCap?: string;           // 一个对象笔画的线条结尾风格（ "butt", "round", "square"之一）
    strokeLineJoin?: string;          // 一个物体笔划的角落样式（“bevil”，“round”，“Mitre”之一）
    strokeMiterLimit?: number;        // 对象笔画的最大斜接长度（用于strokeLineJoin =“miter”）
    transparentCorners?: boolean;     // 如果为true，则对象的控制角将在内部呈现为透明（即笔触而不是填充）
}

/**
 * 元素的公共属性
 */
export interface EleCommonOptions extends EleCommonConfig {
    type: string;              // 类型名称
    width?: number;            // 宽度
    height?: number;           // 高度
    angle?: number;            // 物体的旋转角度（度）
    visible?: boolean;         // 设置为“false”时，对象不会呈现在画布上;
    opacity?: number;          // 物体的不透明度
    flipX?: boolean;           // 如果为true，则将对象呈现为水平翻转
    flipY?: boolean;           // 如果为true，则将对象呈现为水平翻转
    originX?: string;          // 对象转换的水平原点（"left", "right", "center"之一）
    originY?: string;          // 对象转换的水平原点（ "top", "bottom", "center"之一）
    padding?: number;          // 对象与其控制边框之间的填充（以像素为单位）
    left?: number | string;    // 物体的左侧位置。请注意，默认情况下它是相对于左侧的对象。你可以通过设置originX = {left / center / right}
    top?: number | string;     // 物体的顶部位置。请注意，默认情况下，它是相对于对象顶部。你可以通过设置originY = {top / center / bottom}
    scaleX?: number;           // 对象比例因子（水平）
    scaleY?: number;           // 对象比例因子（垂直）
    skewX?: number;            // 物体x轴上的倾斜角度（以度为单位）
    skewY?: number;            // 物体y轴上的倾斜角度（以度为单位）
    selectable?: boolean;      // 设置为“false”时，不能选择对象进行修改（使用基于点击或基于组的选择）。但是事件仍然在激化。
    shadow?: ShadowOptions | string;                 // 文字阴影
    stroke?: string;           // 定义时，通过笔划呈现对象，此属性指定其颜色
    strokeWidth?: number;      // 行程的宽度。对于图像质量，2的笔画倍数会得到更好的结果。
    backgroundColor?: string;  // 对象的背景颜色
    lockMovementX?: boolean;   // 当“true”时，对象水平移动被锁定
    lockMovementY?: boolean;   // 当“true”时，对象水平移动被锁定
    lockRotation?: boolean;    // 当“true”时，对象旋转被锁定
    lockScalingX?: boolean;    // 当“true”时，对象水平缩放被锁定
    lockScalingY?: boolean;    // 当“true”时，对象垂直缩放被锁定
    lockSkewingX?: boolean;    // 当“true”时，对象水平偏移被锁定
    lockSkewingY?: boolean;    // 当“true”时，对象垂直偏移被锁定
    lockUniScaling?: boolean;  // 当“true”时，对象非一致缩放被锁定
    locked: boolean;             // 当“true”时，对象锁定
    minScaleLimit?: number;    // 对象的最小允许缩放值
    hasControls?: Boolean;     // 设置为“false”时，对象的控件不显示，不能用于操作对象
}



// 素材类型
export enum ElemetType {
    Image = 'image',
    Bg = 'bg',
    Text = 'text',
    Graph = 'graph',
    Group = 'group'
}

// 水平对齐方式
export enum AlignX {
    left = 'left',
    center = 'center',
    right = 'right'
}

// 纵向对齐方式
export enum AlignY {
    left = 'top',
    center = 'center',
    right = 'bottom'
}

// 画布类型 ：单图/三图
export enum CanvasType {
    singlePic = 0,
    threePic
}

// 画布策略
export interface CanvasDrawStack {
    [name: string]: CanvasDraw;
}

// 元素类型
export enum ELeType {
    group = 'activeSelection',
    image = 'image',
    text = 'textBox'
}

// 阴影配置
export interface ShadowOptions {
    color?: string;          // 阴影颜色
    blur?: number;           // 阴影模糊
    offsetX?: number;        // 阴影水平偏移
    offsetY?: number;        // 阴影垂直偏移
}







