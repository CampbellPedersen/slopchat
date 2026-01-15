import { NewsCategory, NewsStory } from "#src/types.js"
import { getTopStories } from "./external/newsapi.js";

type CheckTopStoriesParams = {
  search?: string;
  category?: NewsCategory;
}

export const checkTopStories = async (params: CheckTopStoriesParams): Promise<NewsStory[]> =>
  getTopStories(params);