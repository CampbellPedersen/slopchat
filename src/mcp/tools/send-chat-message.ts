import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TwitchAuthInfo } from "#src/middleware/twitch-oauth.js";
import { sendMessageToAtrioc } from "#src/services/send-message-to-atrioc.js";
import { SendChatMessageInputSchema } from "#src/types.js";

export const registerSendChatMessage = (server: McpServer) => {
  server.registerTool(
    "send_chat_message",
    {
      title: "Send Chat Message",
      description: "Sends a message to Atrioc's Twitch chat. Before writing a message, check his stream or Reddit to get context so you can write a message that stands out and will be sure to get Atrioc to notice you!",
      inputSchema: SendChatMessageInputSchema,
    },
    async ({message}, {authInfo}) => {
      // Should never hit this, middleware should populate this
      if (!authInfo) return {
        content: [
          {
            type: 'text',
            text: 'Unauthorized.',
          }
        ]
      }

      await sendMessageToAtrioc({message, auth: authInfo as TwitchAuthInfo})

      return {
        content: [
          {
            type: "text",
            text: "Your chat message was sent successfully.",
          },
        ],
      };
    }
  );
}