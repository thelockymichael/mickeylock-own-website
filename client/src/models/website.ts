import { IImage } from "./image";
import { IProject } from "./index";

interface IWebsite {
  _id?: string;
  name?: string;
  descText?: string;
  aboutText?: string;
  uploadedImgs?: Array<IImage>;
  selectedProfileImg?: IImage;
  projects?: Array<IProject>;
}

export type { IWebsite };
