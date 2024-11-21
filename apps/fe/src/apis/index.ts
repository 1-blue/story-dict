export * from "./auth";
export * from "./users";
export * from "./images";
export * from "./posts";
export * from "./posts/comments";
export * from "./posts/reactions";
export * from "./posts/comments/reactions";

import { authApis } from "./auth";
import { userApis } from "./users";
import { imageApis } from "./images";
import { postApis } from "./posts";
import { postCommentApis } from "./posts/comments";
import { reactionApis } from "./posts/reactions";
import { postCommentReactionApis } from "./posts/comments/reactions";

export const apis = {
  auth: authApis,
  users: userApis,
  images: imageApis,
  posts: {
    ...postApis,
    comments: {
      ...postCommentApis,
      reactions: postCommentReactionApis,
    },
    reactions: reactionApis,
  },
};
