module.exports = (sequelize, dataTypes) => {

    const alias = 'Inventory';

    const cols = {
        inventory_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        supplier: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        expiration_date: {
            type: dataTypes.DATE,
            allowNull: true
        },
        category: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        sale_price: {
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    };

    const config = {
        tableName: 'inventory',
        timestamps: false,
    };

    const Inventory = sequelize.define(alias, cols, config);

    return Inventory;

};