import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  failedLoginAttempts?: number;
  role: string;
}

export interface Movie {
  title: string;
  genre: string;
  thumbnailPath: string;
  videoPath: string;
  videoMimeType: string;
  _id: ObjectId;
}

export interface Like {
  userId: ObjectId;
  movieId: ObjectId;
  status: boolean;
  _id: ObjectId;
}
