const sequelize = require("../dbService");

const db = {};

db.sequelize = sequelize;

db.users = require("./users")(sequelize);
db.registerVerification = require("./registerVerifications")(sequelize);

// relationship

db.users.belongsTo(db.registerVerification, {
  foreignKey: "uid",
  targetkey: "id",
  as: "reg_ver",
});
db.users.hasMany(db.registerVerification, {
  foreignKey: "uid",
  sourcekey: "id",
});

module.exports = db;
