import { ObjectId } from "mongodb";

export enum UserRole {
  VIEWER = "viewer",
  MARKETING = "marketing",
  EDITOR = "editor",
}

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  failedLoginAttempts?: number;
  role: UserRole;
}

export interface Movie {
  title: string;
  genre: string;
  thumbnailPath: string;
  videoPath: string;
  videoMimeType: string;
  comment?: string;
  _id: ObjectId;
}

export interface Like {
  userId: ObjectId;
  movieId: ObjectId;
  status: boolean;
  _id: ObjectId;
}
