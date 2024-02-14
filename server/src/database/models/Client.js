module.exports = (sequelize, dataTypes) => {

    const alias = 'Client';

    const cols = {

        client_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
          },
          first_name: {
            type: dataTypes.STRING(50),
            collate: 'utf8mb4_general_ci',
            allowNull: false,
          },
          middle_name: {
            type: dataTypes.STRING(50),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
          last_name: {
            type: dataTypes.STRING(50),
            collate: 'utf8mb4_general_ci',
            allowNull: false,
          },
          phone_number: {
            type: dataTypes.STRING(20),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
          email: {
            type: dataTypes.STRING(255),
            collate: 'utf8mb4_general_ci',
            allowNull: true,
          },
    };

    const config = {
        tableName: 'clients',
        timestamps: false,
    }; 
    
    const Client = sequelize.define(alias, cols, config);

    Client.associate = (models) => {
        Client.hasMany(models.Appointment, {
            as: 'clientAppointment',
            foreignKey: 'client_id',
        });
    };


    return Client; 

};