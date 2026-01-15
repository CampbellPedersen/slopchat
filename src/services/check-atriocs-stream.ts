import { getApiClient, getChatClient, getChatMessageBatch, getChannel, getUser } from "./external/twitch.js";
import { TwitchAuthInfo } from "#src/middleware/twitch-oauth.js";
import { ChatMessage } from "#src/types.js";

type StreamInfo = {
  streamTitle: string;
  streamCategory: string;
  messages: ChatMessage[];
}

export const checkAtriocsStream = async (auth: TwitchAuthInfo): Promise<StreamInfo> => {
  const apiClient = getApiClient(auth);
  const channel = 'atrioc'; // Moo!
  const user = await getUser({login: channel, client: apiClient})
  const stream = await getChannel({user, client: apiClient});

  const chatClient = getChatClient(auth, ['atrioc']);
  chatClient.connect();
  const messages = await getChatMessageBatch({client: chatClient});
  chatClient.quit();

  return {
    streamTitle: stream.title,
    streamCategory: stream.category,
    messages,
  }
}