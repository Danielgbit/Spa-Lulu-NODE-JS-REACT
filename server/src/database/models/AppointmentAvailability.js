module.exports = (sequelize, dataTypes) => {

  const alias = 'AppointmentAvailability';

  const cols = {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    appointment_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Appointments',
        key: 'appointment_id',
      },
    },
    availability_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Availabilities',
        key: 'availability_id',
      },
    },
    employee_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'employee_id',
      },
    },
  };

  const config = {
    tableName: 'appointmentAvailability',
    timestamps: false,
  };

  const AppointmentAvailability = sequelize.define(alias, cols, config);


  AppointmentAvailability.associate = (models) => {
    AppointmentAvailability.belongsTo(models.Employee, {
      as: 'employee',
      foreignKey: 'employee_id',
    });
    
    AppointmentAvailability.belongsTo(models.Appointment, {
      as: 'appointment',
      foreignKey: 'appointment_id',
    });

    AppointmentAvailability.belongsTo(models.Availability, {
      as: 'availability',
      foreignKey: 'availability_id'
    });
  };


  return AppointmentAvailability;

};