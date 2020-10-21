"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TemplatePlans extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  TemplatePlans.init(
    {
      PlanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "plans",
          key: "id",
        },
      },
      TemplateId: {
        type: DataTypes.INTEGER,
        references: {
          model: "templates",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TemplatePlans",
    }
  );

  return TemplatePlans;
};
