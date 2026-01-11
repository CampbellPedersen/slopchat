import cors from 'cors';

export const corsMiddleware = cors({
    origin: function(origin, callback) {
      
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} not allowed`));
      }
    },
    credentials: true
  }
);

const allowedOrigins = [
  // Claude
  'https://claude.ai',
  'https://claude.com',
  // MCP inspector
  'http://localhost:6274'
];