/**
 * @file 一张图片所包含的数据，程序中以 JS 形式存在，最终导出为 XML
 */
import path from 'path';
import gm from 'gm';

// 图片源
interface PictureSource {
  // 数据库 @todo 不清楚这个属性的确切含义，看情况值都是 Unknown
  database: string;
}

// 图片尺寸
interface PictureSize {
  width: number;
  height: number;
  // 图片深度 @todo 不清楚这个属性的确切含义，看情况值都是 3
  depth: number;
}

// 区域坐标
interface PictureBox {
  // X 坐标最小值
  xmin: number;
  // Y 坐标最小值
  ymin: number;
  // X 坐标最大值
  xmax: number;
  // Y 坐标最大值
  ymax: number;
}

// 图片标记区域
interface PictureObject {
  // 区域代表的组件名
  name: string;
  // @todo 不清楚这个属性的确切含义，看情况值都是 Unspecified
  pose: string;
  // @todo 不清楚这个属性的确切含义，看情况值都是 0
  truncated: number;
  // @todo 不清楚这个属性的确切含义，看情况值都是 0
  difficult: number;
  // 区域的坐标
  bndbox: PictureBox;
}

// 图片描述对象
interface PictureAnnotation {
  // 图片所在文件夹名称
  folder: string;
  // 图片文件名
  filename: string;
  // 图片的绝对路径
  path: string;
  // 图片源
  source: PictureSource;
  // 图片尺寸
  size: PictureSize;
  // 图片分割 @todo 不清楚这个属性的确切含义，看情况值都是 0
  segmented: number;
  // 标记区域，由于整张图片都被标记，所以只有一个标记区域
  object: PictureObject;
}

/**
 * 获取图片尺寸
 * @param picturePath 图片地址
 */
async function getPictureSize(picturePath: string): Promise<PictureSize> {
  const pictureResolvePath = path.resolve(picturePath);
  const size = {
    width: 0,
    height: 0,
    depth: 3
  };

  try {
    const { width, height } = await new Promise((resolve, reject) => {
      gm(pictureResolvePath).size((error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      })
    })

    size.width = width;
    size.height = height;
  } catch (error) {
    console.log(`get picture data error: ${error}`);
  }

  return size;
}

/**
 * 获取图片的数据
 */
export async function getPictureData(picturePath: string, componentName: string): Promise<PictureAnnotation> {
  const resolvePath = path.resolve(picturePath);
  // 解析图片的路径
  const pathObject = path.parse(resolvePath);
  const {
    base,
    // 目录的绝对路径
    dir
  } = pathObject;
  // 只需要目录名即可
  const folder = path.basename(dir);

  const size = await getPictureSize(resolvePath);
  const { width, height } = size;

  const data: PictureAnnotation = {
    folder,
    filename: base,
    path: resolvePath,
    source: {
      database: 'Unknown'
    },
    size,
    segmented: 0,
    object: {
      name: componentName,
      pose: 'Unspecified',
      truncated: 0,
      difficult: 0,
      bndbox: {
        xmin: 0,
        ymin: 0,
        xmax: width,
        ymax: height
      }
    }
  }

  return data;
}
