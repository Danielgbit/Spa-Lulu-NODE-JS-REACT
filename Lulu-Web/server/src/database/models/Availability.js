module.exports = (sequelize, dataTypes) => {

  const alias = 'Availability';

  const cols = {

    availability_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employee',
        key: 'employee_id',
      },
    },
    start_time: {
      type: dataTypes.DATE,
      allowNull: true, // O ajusta según tus necesidades
    },
    end_time: {
      type: dataTypes.DATE,
      allowNull: true, // O ajusta según tus necesidades
    },
  };

  const config = {
    tableName: 'availability',
    timestamps: false,
  };

  const Availability = sequelize.define(alias, cols, config);

  Availability.associate = (models) => {
    Availability.belongsTo(models.Employee, {
      as: 'availabilityEmployee',
      foreignKey: 'employee_id'
    });

    Availability.belongsToMany(models.Appointment, {
      through: 'AppointmentAvailability',
      foreignKey: 'availability_id',
      otherKey: 'appointment_id',
      as: 'availabilityAppointments',
    });


  };

  return Availability;

};