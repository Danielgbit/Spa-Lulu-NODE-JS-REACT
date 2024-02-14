module.exports = (sequelize, dataTypes) => {

    const alias = 'ProductCategory';

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
        tableName: 'product_categories',
        timestamps: false
    };

    const ProductCategory = sequelize.define(alias, cols, config);


    ProductCategory.associate = (models) => {
      ProductCategory.hasMany(models.Product, {
        as: 'categoryProducts',
        foreignKey: 'category_id',
        timestamps: false
      })
    }



    return ProductCategory; 

};