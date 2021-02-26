import sharp from "sharp";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export async function cli(args) {
  const image = process.argv.slice(2).join(" ");
  const { dominant } = await sharp(image).stats();
  const { r, g, b } = dominant;
  console.log(rgbToHex(r, g, b));
}
