export interface Post {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  createdBy: number;
  createdAt: Date;
}

export interface PostWithPicture extends Post {
  picture?: object;
}
