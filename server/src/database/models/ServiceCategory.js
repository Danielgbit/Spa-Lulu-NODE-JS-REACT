module.exports = (sequelize, dataTypes) => {

    const alias = 'ServiceCategory';

    const cols = {

        category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          category_name: {
            type: dataTypes.STRING,
            allowNull: false
          },
          
    };

    const config = {
        tableName: 'service_categories',
        timestamps: false
    };

    const ServiceCategory = sequelize.define(alias, cols, config);


    ServiceCategory.associate = (models) => {

        ServiceCategory.hasMany(models.Service, {
            as: 'categoryServices',
            foreignKey: 'category_id',
            timestamps: false
        })
        
    }



    return ServiceCategory; 

};