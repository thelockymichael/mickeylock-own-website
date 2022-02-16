import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProject } from "./index";

interface IImage {
  _id?: string;
  name: string;
  img?: Buffer;
  imgType?: string;
}

interface ImageModelInterface extends mongoose.Model<ImageDoc> {
  build(attr: IImage): ImageDoc;
}

interface ImageDoc extends mongoose.Document {
  _id?: string;
  name: string;
  img: Buffer;
  imgType: string;
}

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  img: {
    type: Buffer,
    required: true,
  },
  imgType: {
    type: String,
    required: true,
  },
});

imageSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

imageSchema.plugin(uniqueValidator);

imageSchema.statics.build = (attr: IImage) => new Image(attr);

const Image = mongoose.model<ImageDoc, ImageModelInterface>(
  "Image",
  imageSchema
);

export { Image, IImage };
