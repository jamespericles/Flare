"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      });
      this.belongsToMany(models.Template, { through: models.TemplatePlans });
      this.belongsToMany(models.Group, { through: models.GroupPlans });
    }
  }

  // When this becomes "having many templates" and "haveing many groups":
  // hasOne should become belongsToMany because the templates and groups
  // belongsToMany Plans

  // hasMany w/ belongsTo
  // hasOne w/ belongsToMany or belongsTo
  // belongsToMany w/ belongsToMany

  Plan.init(
    {
      planname: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      isHome: DataTypes.BOOLEAN,
      durationBeforeExecution: DataTypes.INTEGER,
      activatestart: DataTypes.DATE,
      activateend: DataTypes.DATE,
      executeplan: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Plan",
    }
  );

  return Plan;
};
