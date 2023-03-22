module.exports = (sequelize, DataType) => {
    const USERS = sequelize.define('USERS', {
        ID: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USERNAME: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        FIRST_NAME: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        LAST_NAME: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        HASH_PASSWORD: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        
        EMAIL: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        TELEPHONE: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }   
        },
        STATUS: {                   // 0 = inactive, 1 = active, 2 = banned
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return USERS;
}