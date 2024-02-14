module.exports = (sequelize, dataTypes) => {

    const alias = 'Product';

    const cols = {

        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          product_name: {
            type: dataTypes.STRING,
            allowNull: false
          },
          description: {
            type: dataTypes.TEXT,
            allowNull: true
          },
          price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: true
          },
          category_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'product_categories',
              key: 'category_id'
            }
          },
          image: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {

        Product.belongsTo(models.ProductCategory, {
            as: 'productsCategory',
            foreignKey: 'category_id',
            targetKey: 'category_id'
        });
    };



    return Product; 

};