"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        onDelete: "cascade"
      });
      this.belongsToMany(models.Group, { through: models.ContactGroups });
    }
  }

  Contact.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      relationship: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Contact"
    }
  );

  return Contact;
};
