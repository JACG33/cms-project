import { DataTypes, Model } from "sequelize";
import { sequelize } from "./DB.js";

class Categories extends Model {}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Categories",
    tableName: "categories",
  }
);

export default Categories;
