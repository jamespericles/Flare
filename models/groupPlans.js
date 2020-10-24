"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class GroupPlans extends Model {
        /*
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    GroupPlans.init(
        {
            PlanId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "plans",
                    key: "id",
                },
            },
            GroupId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "templates",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "GroupPlans",
        }
    );

    return GroupPlans;
};
