import dotenv from "dotenv";
import express from "express";
dotenv.config();

import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { corsMiddleware } from "./middleware/cors.js";
import { twitchOAuthMiddleware } from "./middleware/twitch-oauth.js";
import { oauthRouter } from "./routes/oauth.js";
import { mcpRouter } from "./routes/mcp.js";
import { followsBigGreenAUMiddleware } from "./middleware/follows-biggreenau.js";

const HOST = process.env.HOST ?? 'localhost';
export const MCP_URL = `https://${HOST}/mcp`;
const app = createMcpExpressApp({allowedHosts: [HOST, 'localhost']});

app.use(express.static("public"));
app.use(corsMiddleware)
app.use(oauthRouter)
app.use('/mcp', twitchOAuthMiddleware, followsBigGreenAUMiddleware, mcpRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP server running at ${MCP_URL}`);
});
