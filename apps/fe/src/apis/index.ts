export * from "./auth";
export * from "./users";
export * from "./images";
export * from "./posts";
export * from "./comments";
export * from "./reactions";

import { authApis } from "./auth";
import { userApis } from "./users";
import { imageApis } from "./images";
import { postApis } from "./posts";
import { commentApis } from "./comments";
import { reactionApis } from "./reactions";

export const apis = {
  auth: authApis,
  users: userApis,
  images: imageApis,
  posts: postApis,
  comments: commentApis,
  reactions: reactionApis,
};
