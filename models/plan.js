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
        foreignKey: { allowNull: false }
      });
      this.hasOne(models.Template);
    }
  }

  Plan.init(
    {
      planname: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      isHome: DataTypes.BOOLEAN,
      durationBeforeExecution: DataTypes.INTEGER,
      activatestart: DataTypes.DATE,
      activateend: DataTypes.DATE,
      executeplan: DataTypes.BOOLEAN,
      contacts: DataTypes.INTEGER,
      groups: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Plan"
    }
  );

  return Plan;
};
