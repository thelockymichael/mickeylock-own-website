import sharp from "sharp";

const makeThumbnail = async (file, thumbname) => {
  const thumbnail = await sharp(file)
    .resize(500, 750, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(thumbname);

  return thumbnail;
};

export { makeThumbnail };
