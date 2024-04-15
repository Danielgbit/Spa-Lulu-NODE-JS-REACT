module.exports = (sequelize, dataTypes) => {

    const alias = 'Contact';

    const cols = {

        contact_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        phone_number: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        address: {
            type: dataTypes.STRING,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        note: {
            type: dataTypes.TEXT,
            collate: 'utf8mb4_general_ci',
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }

    };

    const config = {
        tableName: 'contacts',
        timestamps: true
    };


    const Contact = sequelize.define(alias, cols, config);


    return Contact; 

};