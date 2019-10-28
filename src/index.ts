/**
 * @file 将图片生成 XML 文件
 */
import path from 'path';
import fs from 'fs';
import { parse } from 'js2xmlparser';
import { getPictureData } from './data';

export async function pictureToXML(
  picturePath: string,
  componentName: string,
  outputPath: string
): Promise<void> {
  const data = await getPictureData(picturePath, componentName);
  const output = parse('annotation', data, {
    declaration: {
      include: false
    }
  });

  const outputResolvePath = path.resolve(outputPath);
  fs.writeFileSync(outputResolvePath, output);
}
