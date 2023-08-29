import { DataTypes, Model } from "sequelize";
import { sequelize } from "./DB.js";

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrip: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statuspost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Posts",
    tableName: "postsnode",
  }
);

export { Posts };
