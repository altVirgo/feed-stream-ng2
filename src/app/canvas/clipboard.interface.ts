export interface Clipboard {
    type?: ClipboardType;
    left?: number;
    top?: number;
    obj?: any;
}

export enum ClipboardType {
    copy = 0,
    cut
}
