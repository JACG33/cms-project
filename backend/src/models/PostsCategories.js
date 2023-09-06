import { DataTypes, Model } from "sequelize";
import { sequelize } from "./DB.js";

class PostCategories extends Model {}

PostCategories.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		posts: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "PostCategories",
		tableName: "postcategories",
	},
);
export { PostCategories };

