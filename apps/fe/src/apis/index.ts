export * from "./stories";
export * from "./stories/comments";
export * from "./stories/reactions";
export * from "./stories/comments/reactions";

import { storyApis } from "./stories";
import { storyCommentApis } from "./stories/comments";
import { storyReactionApis } from "./stories/reactions";
import { storyCommentReactionApis } from "./stories/comments/reactions";

export const apis = {
  stories: {
    ...storyApis,
    reactions: storyReactionApis,
    comments: {
      ...storyCommentApis,
      reactions: storyCommentReactionApis,
    },
  },
};
