"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactGroups extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  ContactGroups.init(
    {
      GroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
      },
      ContactId: {
        type: DataTypes.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ContactGroups",
    }
  );

  return ContactGroups;
};
