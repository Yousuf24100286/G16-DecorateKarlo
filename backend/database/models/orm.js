require('dotenv').config();
const { Sequelize , DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE, 
  process.env.PGUSER, 
  process.env.PGPASSWORD, 
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: process.env.PGPORT
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}
).catch(err => {
  console.error('Unable to connect to the database:', err);
});


const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priv: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync().then(() => {
  console.log('Users table created');
}).catch(err => {
  console.log('Error creating users table', err);
});



exports.sequelize = sequelize;