/**
 * Defines all types that are used throughout the video-platform
 * project
 */
import { ObjectId } from "mongodb";

/** Representation of the roles that users are able to be assigned */
export enum UserRole {
  VIEWER = "viewer",
  MARKETING = "marketing",
  EDITOR = "editor",
}

/** Structure of a User document within MongoDB */
export interface User {
  /** ID of the user */
  _id: ObjectId;
  /** User's username */
  username: string;
  /** SHA256 hashed password of the user */
  password: string;
  /** Number of times the account has been attempted to be signed into */
  failedLoginAttempts?: number;
  /** Role of the user */
  role: UserRole;
}

/** Structure of a Movie document within MongoDB */
export interface Movie {
  /** Movie title */
  title: string;
  /** Genre of the movie */
  genre: string;
  /** Path of the video's thumbnail relative to src/static */
  thumbnailPath: string;
  /** Path of the video file relative to src/static */
  videoPath: string;
  /** MIME type of the video for playback */
  videoMimeType: string;
  /** Marketing manager comment */
  comment?: string;
  /** ID of the movie */
  _id: ObjectId;
}

/** Structure of a Like document within MongoDB */
export interface Like {
  /** The user who has liked the movie */
  userId: ObjectId;
  /** The movie ID the like is associated with */
  movieId: ObjectId;
  /** True for liked, false for disliked */
  status: boolean;
  /** ID of the like */
  _id: ObjectId;
}
