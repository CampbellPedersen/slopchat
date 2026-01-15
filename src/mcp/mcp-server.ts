import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerSendChatMessage } from "./tools/send-chat-message.js";
import { registerCheckStream } from "./tools/check-stream.js";
import { registerCheckReddit } from "./tools/check-reddit.js";
import { registerCheckNews } from "./tools/check-news.js";

export const getMcpServer = () => {
  const mcpServer = new McpServer({
    name: "SlopChat with Atrioc",
    version: "1.0.0",
  });

  registerCheckStream(mcpServer);
  registerCheckReddit(mcpServer);
  registerCheckNews(mcpServer);
  registerSendChatMessage(mcpServer);
  
  const transport = new StreamableHTTPServerTransport()
  mcpServer.connect(transport);
  return { server: mcpServer, transport };
}