module.exports = (sequelize, dataTypes) => {

  const alias = 'Service';

  const cols = {

    service_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    service_name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true
    },
    duration_minutes: {
      type: dataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: dataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    category_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'service_categories',
        key: 'category_id'
      },
    },
    image: {
      type: dataTypes.STRING,
      allowNull: false
    }

  };

  const config = {
    tableName: 'services',
    timestamps: false
  };

  const Service = sequelize.define(alias, cols, config);

  Service.associate = (models) => {

    Service.belongsTo(models.ServiceCategory, {
      as: 'serviceCategory',
      foreignKey: 'category_id',
      targetKey: 'category_id'
    });

    Service.hasMany(models.Appointment, {
      as: 'serviceAppointment',
      foreignKey: 'service_id'
    });

  };


  return Service;

};