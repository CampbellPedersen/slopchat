import express, { Request } from 'express';
import { RequestWithTwitchAuth } from '../middleware/twitch-oauth.js';
import { getMcpServer } from '../mcp/mcp.js';

export const mcpRouter = express.Router();

mcpRouter.get('/', async (req: RequestWithTwitchAuth, res) => {
  const {transport} = getMcpServer();

  transport.handleRequest(req, res, req.body);
});

mcpRouter.post('/', async (req: RequestWithTwitchAuth, res) => {
  const {transport} = getMcpServer();

  transport.handleRequest(req, res, req.body);
});

mcpRouter.delete('/', async (req: RequestWithTwitchAuth, res) => {
  const {transport} = getMcpServer();

  transport.handleRequest(req, res, req.body);
});