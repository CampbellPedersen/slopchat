import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CheckNewsInputSchema, CheckNewsOutputSchema } from "#src/types.js";
import { checkTopStories } from "#src/services/check-top-stories.js";

export const registerCheckNews = (server: McpServer) => {
  server.registerTool(
    "check_top_news_stories",
    {
      description: `Checks for current top news stories to show Atrioc. Search parameters and category filters are available but are optional.`,
      title: "Check the internet for the current top news stories.",
      inputSchema: CheckNewsInputSchema,
      outputSchema: CheckNewsOutputSchema,
    },
    async ({search, category}) => {
      const stories = await checkTopStories({search, category});
      const output = {stories}

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