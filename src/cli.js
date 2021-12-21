import sharp from "sharp";

function rgbToHex(red, green, blue) {
  return `#${(blue | (green << 8) | (red << 16) | (1 << 24))
    .toString(16)
    .slice(1)}`
}

export async function cli(args) {
  const image = process.argv.slice(2).join(" ");
  const { dominant } = await sharp(image).stats();
  console.log(rgbToHex(dominant.r, dominant.g, dominant.b));
}
