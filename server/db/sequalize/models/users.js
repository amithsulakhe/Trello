const { DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");

function makeModel(sequelize) {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        unique: false,
        lowercase: false,
        primaryKey: false,
        allowNull: true,
      },
      isverified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
      },
      id_str: {
        type: DataTypes.CHAR,
        unique: false,
        lowercase: false,
        primaryKey: false,
        allowNull: false,
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
          async function (users, options) {
            if (users.password) {
              users.password = await bcrypt.hash(users.password, 8);
            }
            users.isActive = true;
            users.isDeleted = false;
          },
        ],
      },

      // Other model options go here
    }
  );

  user.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    delete values.id;
    return values;
  };

  return user;
}

module.exports = makeModel;
