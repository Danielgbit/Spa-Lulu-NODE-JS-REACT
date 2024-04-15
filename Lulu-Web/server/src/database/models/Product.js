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
            type: dataTypes.STRING(200),
            allowNull: true
          },
          price: {
            type: dataTypes.INTEGER,
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
          stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false
          },
          discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
          },
          imageUrls: {
            type: dataTypes.JSON
          },
          imagePrimary: {
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

        Product.hasMany(models.OrderDetail, {
          as: 'orderDetails',
          foreignKey: 'product_id'
        });
        
    };



    return Product; 

};