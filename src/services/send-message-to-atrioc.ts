import { TwitchAuthInfo } from "../middleware/twitch-oauth.js";
import { getApiClient, getUser, sendMessage } from "./twitch.js";

type SendMessageToAtriocParams = {
  auth: TwitchAuthInfo;
  message: string;
}

export const sendMessageToAtrioc = async ({message, auth}: SendMessageToAtriocParams) => {
  const apiClient = getApiClient(auth);
  const atrioc = await getUser({login: 'atrioc', client: apiClient});
  await sendMessage({message, to: atrioc, client: apiClient});
}