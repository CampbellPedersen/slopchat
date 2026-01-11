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
})

export const SendChatMessageInputSchema = z.object({
  message: z.string().describe('The ttext content of the message to send.')
})