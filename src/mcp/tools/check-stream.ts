import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TwitchAuthInfo } from "#src/middleware/twitch-oauth.js";
import { checkAtriocsStream } from "#src/services/check-atriocs-stream.js";
import { CheckChatOutputSchema } from "#src/types.js";

export const registerCheckStream = (server: McpServer) => {
  server.registerTool(
    "check_stream",
    {
      title: "Check Atrioc's Stream",
      description: `Checks Atrioc's Twitch stream title, current streaming category and grab 3 seconds of chat messages. Then, use this information to come up with an original, funny stand-out message to send to his chat!`,
      outputSchema: CheckChatOutputSchema,
    },
    async ({authInfo}) => {
      // Should never hit this, middleware should populate this
      if (!authInfo) return {
        content: [
          {
            type: 'text',
            text: 'Unauthorized.',
          }
        ]
      }
      const streamInfo = await checkAtriocsStream(authInfo as TwitchAuthInfo);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(streamInfo),
          },
        ],
        structuredContent: streamInfo,
      };
    }
  );
}