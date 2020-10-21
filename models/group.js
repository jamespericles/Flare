"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { allowNull: false },
      });
      this.hasMany(models.Contact);
    }
  }

  Group.init(
    {
      groupname: DataTypes.STRING,
      contacts: DataTypes.INTEGER,
      plans: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );

  return Group;
};
