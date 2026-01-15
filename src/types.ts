import { z } from "zod";

export const ChatMessageSchema = z.object({
  username: z.string().describe("The username of the user who sent the chat message."),
  content: z.string().describe("The text content of the chat message."),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>

export const CheckChatOutputSchema = z.object({
  streamTitle: z.string().describe("The current title of Atrioc's stream."),
  streamCategory: z.string().describe('The current game/streaming category on Twitch.'),
  messages: z.array(ChatMessageSchema).describe("A batch of chat messages retrieved from Atrioc's chat."),
});

export const SendChatMessageInputSchema = z.object({
  message: z.string().describe(`The text content of the message to send. You may end this with a Reddit post permalink if you want to show it to Atrioc and chat.`)
});

const RedditCommentSchema: z.ZodType<RedditComment> = z.lazy(() =>
  z.object({
    author: z.string(),
    upvotes: z.number(),
    body: z.string(),
    replies: z.array(RedditCommentSchema).optional()
  })
)

export type RedditComment = {
  author: string;
  upvotes: number;
  body: string;
  replies?: RedditComment[];
}

const RedditPostSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string('The title of the post.'),
  textContent: z.string().describe('The text content of the post. Can sometimes be empty.'),
  upvotes: z.number().describe('The amount of upvotes the post has.'),
  comments: z.array(RedditCommentSchema).describe('A list of comment threads.'),
  permalink: z.string().describe('A link to the post. Put this in chat when you want to share it with Atrioc and chat.'),
});

export type RedditPost = z.infer<typeof RedditPostSchema>;

export const CheckRedditOutputSchema = z.object({
  posts: z.array(RedditPostSchema).describe('A list of Reddit posts.')
})

const NewsCategorySchema = z.enum(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']);

export type NewsCategory = z.infer<typeof NewsCategorySchema>;

export const CheckNewsInputSchema = z.object({
  search: z.string().optional().describe('A search term to search top stories by. Leave blank if not looking for a specific topic of news story.'),
  category: NewsCategorySchema.optional().describe('A category to filter by. Usually, Atrioc is interested in business and tech.')
});

const NewsStorySchema = z.object({
  title: z.string().describe('The title of the news story.'),
  description: z.string().describe('A description of the news content'),
  content: z.string('A snippet of the news story contents, truncated to 200 characters.'),
  url: z.string('The URL of the news article. Use this to share the news story with Atrioc.'),
  source: z.string('The source of the news article.'),
});

export type NewsStory = z.infer<typeof NewsStorySchema>;

export const CheckNewsOutputSchema = z.object({
  stories: z.array(NewsStorySchema).describe('A list of top news stories found.')
});