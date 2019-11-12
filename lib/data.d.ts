interface PictureSource {
    database: string;
}
export interface PictureSize {
    width: number;
    height: number;
    depth: number;
}
interface PictureBox {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}
interface PictureObject {
    name: string;
    pose: string;
    truncated: number;
    difficult: number;
    bndbox: PictureBox;
}
interface PictureAnnotation {
    folder: string;
    filename: string;
    path: string;
    source: PictureSource;
    size: PictureSize;
    segmented: number;
    object: PictureObject;
}
/**
 * 获取图片的数据
 */
export declare function getPictureData(picturePath: string, componentName: string): Promise<PictureAnnotation>;
export {};
