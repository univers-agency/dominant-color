import sharp from "sharp";
import Vibrant from 'node-vibrant'

import { ImageBase } from "@vibrant/image";

class SharpImage extends ImageBase {
  _image = undefined;

  async load(image) {
    if (typeof image === "string" || image instanceof Buffer) {
      const { data, info } = await sharp(image)
        .resize(200, 200, { fit: "inside", withoutEnlargement: true })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      this._image = {
        width: info.width,
        height: info.height,
        data: data,
      };
      return this;
    } else {
      return Promise.reject(
        new Error("Cannot load image from HTMLImageElement in node environment")
      );
    }
  }
  clear() { }
  update() { }
  getWidth() {
    return this._image.width;
  }
  getHeight() {
    return this._image.height;
  }
  resize(targetWidth, targetHeight, ratio) {
    // done in the load step, ignoring any maxDimension or quality options
  }
  getPixelCount() {
    const { width, height } = this._image;
    return width * height;
  }
  getImageData() {
    return this._image;
  }
  remove() { }
}

function rgbToHex(red, green, blue) {
  return `#${(blue | (green << 8) | (red << 16) | (1 << 24))
    .toString(16)
    .slice(1)}`;
}

export async function cli(args) {
  const image = process.argv.slice(2).join(" ");

  const { isOpaque } = await sharp(image).stats();
  if (isOpaque) {
    const v = new Vibrant(image, { ImageClass: SharpImage });
    v.getPalette().then((palette) => console.log(palette.Vibrant.getHex()));
  } else {
    console.log('transparent');
  }
}