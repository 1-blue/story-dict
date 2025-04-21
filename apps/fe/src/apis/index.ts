export * from "./auth";
export * from "./users";
export * from "./images";
export * from "./stories";
export * from "./stories/comments";
export * from "./stories/reactions";
export * from "./stories/comments/reactions";

import { authApis } from "./auth";
import { userApis } from "./users";
import { imageApis } from "./images";
import { storyApis } from "./stories";
import { storyCommentApis } from "./stories/comments";
import { storyReactionApis } from "./stories/reactions";
import { storyCommentReactionApis } from "./stories/comments/reactions";

export const apis = {
  auth: authApis,
  users: userApis,
  images: imageApis,
  stories: {
    ...storyApis,
    reactions: storyReactionApis,
    comments: {
      ...storyCommentApis,
      reactions: storyCommentReactionApis,
    },
  },
};
