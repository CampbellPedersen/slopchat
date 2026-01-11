import { Request, Response, NextFunction } from "express";
import { validateAccessToken, SCOPES } from "../services/twitch.js";
import { PRM_PATH } from "../routes/oauth.js";
import { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

export type TwitchAuthInfo = AuthInfo & {extra: {expiresIn: number, userId: string}};
export type RequestWithTwitchAuth = Request & { auth?: TwitchAuthInfo };

export async function twitchOAuthMiddleware(req: RequestWithTwitchAuth, res: Response, next: NextFunction) {
  try {
    const accessToken = getAccessToken(req);
    const tokenInfo = await validateAccessToken(accessToken)

    if (tokenInfo.client_id !== process.env.TWITCH_CLIENT_ID) {
      return unauthorized(res);
    }

    const tokenScopes = tokenInfo.scopes || [];

    // Ensure required scopes are present
    const missingScopes = SCOPES.filter(
      scope => !tokenScopes.includes(scope)
    );

    if (missingScopes.length > 0) {
      return res.status(403).json({
        error: 'insufficient_scope',
        required_scopes: SCOPES,
        missing_scopes: missingScopes
      });
    }

    req.auth = {
      token: accessToken,
      clientId: tokenInfo.client_id,
      scopes: tokenInfo.scopes,
      extra: {
        userId: tokenInfo.user_id,
        expiresIn: tokenInfo.expires_in
      }
    };

    next();
  } catch (err) {
    console.error('Twitch token validation error:', err);
    return unauthorized(res);
  }
}

const getAccessToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized')
  }

  return authHeader.slice('Bearer '.length);
}

const unauthorized = (res: Response) => {
  return res
    .status(401)
    .set(
      'WWW-Authenticate',
      `resource_metadata="${PRM_PATH}"`
    )
    .end();
}