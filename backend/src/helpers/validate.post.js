import { postSchema } from "../schemas/post.schema.js";

export const ValidatePost = (data) => postSchema.safeParse(data);
