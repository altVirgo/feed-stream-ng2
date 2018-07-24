// 业务类型
export enum BusinessType {
    Size = 'size',
    Template = 'template',
    Image = 'image',
    Text = 'text',
    Graph = 'graph',
    Bg = 'bg',
    Owned = 'owned'
}

// 素材类型
export enum ElemetType {
    Image = 'image',
    Bg = 'bg',
    Text = 'text',
    Graph = 'graph',
    Group = 'group'
}

// 文本类型
export enum TextType {
    headTitle = 1,
    subTitle,
    text
}

/**
 * 左侧菜单配置
 */
export interface LeftMenu {
    /**
     * 业务类型
     */
    type: BusinessType;
    /**
     * 显示标识
     */
    label: string;
    /**
     * 图标的class
     */
    iconClass: string;
}
