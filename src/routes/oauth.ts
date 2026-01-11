import express, { NextFunction, Request, Response } from 'express';
import { exchangeAuthorizationCodeForToken, SCOPES, validateAccessToken } from '../services/twitch.js';
import { MCP_URL } from '../server.js';

export const PRM_PATH = '/.well-known/oauth-protected-resource';
const OAM_PATH = '/.well-known/oauth-authorization-server';
const EXCHANGE_PATH = '/oauth/token';

export const oauthRouter = express.Router();

oauthRouter.get(PRM_PATH, (_, res) => {
  const SERVER_URL = `https://${process.env.HOST}`;
  const prm = {
    resource: MCP_URL,
    authorization_servers: [SERVER_URL],
    scopes_supported: SCOPES,
  };

  res.json(prm);
});

oauthRouter.get(OAM_PATH, (_, res) => {
  const SERVER_URL = `https://${process.env.HOST}`;
  const TWITCH_OAUTH_SERVER = process.env.TWITCH_OAUTH_SERVER
  const oam = {
    issuer: TWITCH_OAUTH_SERVER,
    authorization_endpoint: `${TWITCH_OAUTH_SERVER}/oauth2/authorize`,
    token_endpoint: `${SERVER_URL}${EXCHANGE_PATH}`,
    response_types_supported: ["code"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: SCOPES
  };

  res.json(oam);
});

oauthRouter.post(EXCHANGE_PATH, express.urlencoded({ extended: true }), async (req, res) => {
  const formData = new URLSearchParams(req.body);
  const token = await exchangeAuthorizationCodeForToken(formData)
  res.json(token);
});