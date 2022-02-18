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

const saveImage = async (multerFile?: Express.Multer.File) => {
  if (multerFile) {
    // TODO
    // 1. Resize image
    const thumbnail = await sharp(multerFile?.path)
      .resize(500, 750, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toBuffer();

    const encodedImage = thumbnail.toString("base64");

    const finalImg = {
      name: multerFile?.filename,
      imgType: multerFile.mimetype,
      img: Buffer.from(encodedImage, "base64"),
    };

    return finalImg;
  }
};

export { makeThumbnail, saveImage };
