import { IImage, IUser } from ".";

interface IProject {
  _id?: string;
  name: string;
  description: string;
  tags?: string[];
  gitHubLink?: string;
  image?: IImage;
  date?: Date;
  user: IUser;
}

export type { IProject };
