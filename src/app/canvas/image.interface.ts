import { EleCommonOptions } from './canvas.interface';

/**
 * 图片的全局配置
 */
export interface ImageGlobalConfig {
    cornerColor?: String;              // 控制对象角落的颜色（当它处于活动状态时）
    cornerDashArray?: Array<String>;   // 指定对象控件的虚线模式的数组（hasBorder必须为true）
    cornerSize?: number;               // 对象的控制角的大小（以像素为单位）
    cornerStrokeColor?: String;        // 控制对象角点的颜色（当它处于活动状态并且transparentCorners为false时）
    cornerStyle?: String;              // 指定控制风格，'rect'或'circle'
    borderScaleFactor?: Number;        // 对象的控制边界的比例因子
    borderOpacityWhenMoving?: Number;  // 当对象处于活动状态并移动时，对象的控制边框的不透明度
    borderColor?: String;              // 控制对象边框的颜色（当它处于活动状态时）
    borderDashArray?: Array<String>;   // 指定对象边框的短划线模式的数组（hasBorder必须为true）
    hasBorders?: boolean;              // 当设置为false时，对象的控制边界不会被渲染
    hasRotatingPoint?: Boolean;        // 当设置为“false”时，对象的控制旋转点将不可见或可选
    hoverCursor?: string;              // 悬停在画布上的此对象时使用的默认游标值
    moveCursor?: String;               // 在画布上移动此对象时使用的默认游标值
    selectionBackgroundColor?: String; // 选择对象的背景颜色。活动时，物体后面的彩色图层。与globalCompositeOperation方法不搭配。
}

/**
 * 图片属性
 */
export interface ImageOptions extends EleCommonOptions, ImageGlobalConfig {
    src?: string;
    cacheKey?: String;             // 键用于从2.0.0开始检索表示此图像的纹理
    centeredRotation?: Boolean;    // 如果为true，则此对象将通过控件旋转时使用中心点作为转换的原点。 向后不兼容性注释：此属性取代“centerTransform”（布尔）。
    centeredScaling?: Boolean;     // 如果为true，则此对象在通过控件缩放时将使用中心点作为转换的原点。 向后不兼容性注释：此属性取代“centerTransform”（布尔）。
    cropX?: number;                // 图像以原始图像大小的像素裁剪。自2.0.0起
    cropY?: number;                // 图像以原始图像大小的像素裁剪。自2.0.0起
    evented?: boolean;             // 当设置为“false”时，对象不能成为事件的目标。所有事件都通过它传播。在v1.3.4中引入
    fill?: String;                 // 物体填充的颜色
}
