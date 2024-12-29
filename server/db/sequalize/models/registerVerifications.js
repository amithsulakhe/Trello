const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const registerVerification = sequelize.define(
    "register_verfications",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      ver_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      addedBy: { type: DataTypes.INTEGER },
      updatedBy: { type: DataTypes.INTEGER },
      isverified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
      },
      isDeleted: { type: DataTypes.BOOLEAN },
      isActive: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: [
          async function (registerVerification, options) {
            registerVerification.isActive = true;
            registerVerification.isDeleted = false;
          },
        ],
      },

      // Other model options go here
    }
  );

  registerVerification.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return registerVerification;
}

module.exports = makeModel;
