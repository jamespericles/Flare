"use strict";
const { Model } = require("sequelize");
const TemplatePlans = sequelize.define("TemplatePlans", {
  PlanId: {
    type: DataTypes.INTEGER,
    references: {
      model: Plan,
      key: "id",
    },
  },
  TemplateId: {
    type: DataTypes.INTEGER,
    references: {
      model: Template,
      key: "id",
    },
  },
});
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
      this.belongsToMany(models.Plan, { through: TemplatePlans });
    }
  }

  Template.init(
    {
      nickname: DataTypes.STRING,
      val: DataTypes.STRING,
      users: DataTypes.INTEGER,
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
