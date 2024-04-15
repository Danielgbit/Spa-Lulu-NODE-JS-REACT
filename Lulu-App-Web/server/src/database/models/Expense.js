module.exports = (sequelize, dataTypes) => {

    const alias = 'Expense';

    const cols = {
        expense_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },  
        description: {
            type: dataTypes.STRING(200),
            defaultValue: null,
            allowNull: true
        },
        payment_method: {
            type: dataTypes.STRING(100),
            defaultValue: null,
            allowNull: true
        },
        category: {
            type: dataTypes.STRING(100),
            defaultValue: null,
            allowNull: true
        },
        date_time: {
            type: dataTypes.DATE,
            defaultValue: null,
            allowNull: true
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };

    const config = {
        tableName: 'expenses',
        timestamps: false,
    };

    const Expense = sequelize.define(alias, cols, config);

    return Expense;

};