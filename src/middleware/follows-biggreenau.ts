import { Request, Response, NextFunction } from "express";
import { validateAccessToken, checkIfFollows, getApiClient } from "../services/twitch.js";
import { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

export type TwitchAuthInfo = AuthInfo & {extra: {expiresIn: number, userId: string}};
export type RequestWithTwitchAuth = Request & { auth?: TwitchAuthInfo };


export async function followsBigGreenAUMiddleware(req: RequestWithTwitchAuth, res: Response, next: NextFunction) {
  const {auth} = req;
  if (!auth) return paymentRequired(res);
  const tokenDetails = await validateAccessToken(auth.token);
  const isBigGreen = tokenDetails.login === 'biggreenau';

  const client = getApiClient(auth);
  const followsBigGreen = await checkIfFollows({followeeLogin: 'biggreenau', followerLogin: tokenDetails.login, client});

  if (!isBigGreen || !followsBigGreen) return paymentRequired(res);

  next();
}

const paymentRequired = (res: Response) => {
  const errorMsg = 'Following BigGreenAU is required to use SlopChat.';

  return res
    .status(402)
    .set('Content-Type', 'text/plain')
    .send(errorMsg);
}