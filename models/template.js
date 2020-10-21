"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      });
      this.belongsToMany(models.Plan, { through: models.TemplatePlans });
    }
  }

  Template.init(
    {
      nickname: DataTypes.STRING,
      val: DataTypes.STRING,
      contacts: DataTypes.INTEGER,
      groups: DataTypes.INTEGER,
      plans: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Template",
    }
  );

  return Template;
};
