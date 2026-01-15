import { NewsCategory, NewsStory } from "#src/types.js";

type GetTopStoriesParams = {
  search?: string;
  category?: NewsCategory;
}

export const getTopStories = async ({search, category}: GetTopStoriesParams): Promise<NewsStory[]> => {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) throw new Error('No NewsAPI api key configured.');
  const queryParams = new URLSearchParams({
    apiKey,
    country: 'us',
  });

  if (search) {
    queryParams.append('q', search);
  }

  if (category) {
    queryParams.append('category', category)
  }

  const response = await fetch(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`, {method: 'GET'});
  const responseBody = await response.json();

  return responseBody.articles.map(rawStoryToNewsStory)
}

const rawStoryToNewsStory = (raw: any): NewsStory => ({
  title: raw.title,
  description: raw.description,
  content: raw.content ?? '',
  url: raw.url,
  source: raw.source.name,
});