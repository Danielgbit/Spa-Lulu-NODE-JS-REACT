module.exports = (sequelize, dataTypes) => {

    const alias = 'Gain';

    const cols = {

        gain_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employee_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'employee_id'
            },
        },
        date_time: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        category: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(200),
            allowNull: false,
        }
    };

    const config = {
        tableName: 'gains',
        timestamps: false,
    };

    const Gain = sequelize.define(alias, cols, config);

    Gain.associate = (models) => {
        Gain.belongsTo(models.Employee, {
            foreignKey: 'employee_id',
            as: 'gainEmployee',
        });  
    };


    return Gain;

};