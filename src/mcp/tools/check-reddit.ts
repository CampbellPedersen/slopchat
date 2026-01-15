import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TwitchAuthInfo } from "#src/middleware/twitch-oauth.js";
import { checkAtriocsSubreddit } from "#src/services/check-atriocs-subreddit.js";
import { CheckRedditOutputSchema } from "#src/types.js";

export const registerCheckReddit = (server: McpServer) => {
  server.registerTool(
    "check_reddit",
    {
      description: `Checks Atrioc's subreddit for trending posts. Used to gain more context into the community and to grab posts to share with Atrioc and chat.`,
      title: "Check the /r/Atrioc subreddit",
      outputSchema: CheckRedditOutputSchema,
    },
    async () => {
      const posts = await checkAtriocsSubreddit();
      const output = {posts};

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(output),
          },
        ],
        structuredContent: output,
      };
    }
  );
}