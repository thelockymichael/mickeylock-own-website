interface IImage {
  id?: string;
  name: string;
  img?: {
    type: string;
    data: Array<number>;
  };
  imgType?: string;
}

export type { IImage };
