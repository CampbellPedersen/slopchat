import express from "express";
import { RequestWithTwitchAuth } from "#src/middleware/twitch-oauth.js";
import { getMcpServer } from "#src/mcp/mcp-server.js";

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