import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import mime from "mime";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
import postsRouter from "./routes/posts.router.js";
import commentsRouter from "./routes/comments.router.js";
import likesRouter from "./routes/likes.router.js";
import commentLikesRouter from "./routes/commentLikes.router.js";
import searchRouter from "./routes/search.router.js";
import messagesRouter from "./routes/messages.router.js";
import notificationsRouter from "./routes/notifications.router.js";
import followsRouter from "./routes/follows.router.js";
import exploreRouter from "./routes/explore.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = () => {
  const app = express();

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.includes("vercel.app") || origin.includes("localhost")) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  }));

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  function getMimeType(filePath) {
    return mime.getType(filePath) || "application/octet-stream";
  }

  // Статика с безопасным CORS
  const staticWithCors = (urlPath, folderPath) => {
    app.use(urlPath, express.static(folderPath, {
      setHeaders: (res, filePath, req) => {
        const origin = req?.headers?.origin || "*"; 
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Content-Type", getMimeType(filePath));
      },
    }));
  };

  staticWithCors("/public", path.join(__dirname, "../public"));
  staticWithCors("/avatars", path.join(__dirname, "../public/avatars"));
  staticWithCors("/posts", path.join(__dirname, "../public/posts"));

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/posts", postsRouter);
  app.use("/api/comments", commentsRouter);
  app.use("/api/comment-likes", commentLikesRouter);
  app.use("/api/likes", likesRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/notifications", notificationsRouter);
  app.use("/api/follows", followsRouter);
  app.use("/api/explore", exploreRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return server;
};

export default startServer;
