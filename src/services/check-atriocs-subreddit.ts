import { RedditPost } from "#src/types.js";
import { getTopComments, getTopPosts } from "./external/reddit.js";


export const checkAtriocsSubreddit = async (): Promise<RedditPost[]> => {
  const subreddit = 'atrioc';
  const posts = await getTopPosts({subreddit});
  return Promise.all(posts.map(async (post) => {
    const comments = await getTopComments({subreddit, postId: post.id});

    return {
      ...post,
      comments,
    }
  }));
}