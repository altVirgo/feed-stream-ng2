import { EleCommonOptions } from './canvas.interface';


export interface TextGlobalConfig {
    cornerColor?: string;              // 控制对象角落的颜色（当它处于活动状态时）
    cornerDashArray?: Array<string>;   // 指定对象控件的虚线模式的数组（hasBorder必须为true）
    cornerSize?: number;               // 对象的控制角的大小（以像素为单位）
    cornerStrokeColor?: string;        // 控制对象角点的颜色（当它处于活动状态并且transparentCorners为false时）
    cornerStyle?: string;              // 指定控制风格，'rect'或'circle'
    borderScaleFactor?: number;        // 对象的控制边界的比例因子
    borderOpacityWhenMoving?: number;  // 当对象处于活动状态并移动时，对象的控制边框的不透明度
    borderColor?: string;              // 控制对象边框的颜色（当它处于活动状态时）
    borderDashArray?: Array<string>;   // 指定对象边框的短划线模式的数组（hasBorder必须为true）
    hasBorders?: boolean;              // 当设置为false时，对象的控制边界不会被渲染
    hasRotatingPoint?: boolean;        // 当设置为“false”时，对象的控制旋转点将不可见或可选
    hoverCursor?: string;              // 悬停在画布上的此对象时使用的默认游标值
    moveCursor?: string;               // 在画布上移动此对象时使用的默认游标值
    selectionBackgroundColor?: string; // 选择对象的背景颜色。活动时，物体后面的彩色图层。与globalCompositeOperation方法不搭配。
}

/**
 * 文本属性
 */
export interface TextOptions extends EleCommonOptions, TextGlobalConfig {
    text: string;                    // 文字内容
    textType?: TextType;             // 文字类型
    fontSize?: number;               // 文字尺寸
    fontFamily?: string;             // 文字字体
    fontWeight?: string;             // 文字加粗
    underline?: boolean;             // 文字下划线
    linethrough?: boolean;           // 文字中划线
    overline?: boolean;              // 文字上划线
    fontStyle?: string;              // 文字斜体 normal or italic
    textAlign?: string;              // 文字水平对齐方式"left", "center", and "right"
    charSpacing?: number;             // 文字间距
    lineHeight?: number;             // 文字行高
    backgroundColor?: string;        // 背景颜色
    textBackgroundColor?: string;    // 文字背景颜色
    fill?: String;                   // 文字填充的颜色
}

// 文本类型
export enum TextType {
    headTitle = 1,
    subTitle,
    text
}



