/**
 * @file 将图片生成 XML 文件
 */
import path from 'path';
import fs from 'fs';
import { parse } from 'js2xmlparser';
import {
  getPictureData,
  ComponentData
} from './data';

export async function pictureToXML(
  picturePath: string,
  componentName: string,
  outputPath: string,
  componentData: ComponentData
): Promise<void> {
  const data = await getPictureData(picturePath, componentName, componentData);
  const output = parse('annotation', data, {
    declaration: {
      include: false
    }
  });

  const outputResolvePath = path.resolve(outputPath);
  fs.writeFileSync(outputResolvePath, output);
}

// 导出可用的接口
export {
  PictureBox,
  PictureSize,
  ComponentData
} from './data';
