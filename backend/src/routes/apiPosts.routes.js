import { Router } from "express";
import * as posts from "../controllers/apiPosts.controller.js";

const RouerApiPosts = Router();

RouerApiPosts.get("/api/posts/", posts.GetPosts);

RouerApiPosts.get("/api/posts/:id", posts.GetPost);

RouerApiPosts.post("/api/posts/", posts.CreatePost);

RouerApiPosts.put("/api/posts/:id", posts.UpdatePost);

RouerApiPosts.delete("/api/posts/:id", posts.DeletePost);

export default RouerApiPosts;
