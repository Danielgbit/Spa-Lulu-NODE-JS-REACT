import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Table, Button, Popconfirm, Empty, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import { CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";

const AppointmentAdmin = ({
  allAppointments,
  destroyAppointment,
  allEmployees,
  onClickAppointByDate,
  onClickAppointByDay,
  onChangeDay,
  appointByStartAndEnd,

  appointByEmployee,

  loadAppointments,
}) => {
  const { Title } = Typography;
  const [date, setDate] = useState({});

  const onClickDestroy = (id) => {
    destroyAppointment(id);
  };

  const _onClickAppointByDate = () => {
    onClickAppointByDate();
  };

  const _onClickGainByDay = () => {
    onClickAppointByDay();
  };

  const onClickCleanFilter = () => {
    loadAppointments();
  };

  const _onChangeDay = (e) => {
    const { value } = e.target;
    onChangeDay(value);
  };

  //FILTER BY DATE START & END
  function _onChangeByDateInput(e) {
    const { value, name } = e.target;
    setDate({ ...date, [name]: value });
  }
  function onChangeOnSubmit(e) {
    e.preventDefault();
    appointByStartAndEnd(date);
  } //

  function onChangeAppointByEmployee(e) {
    const { value } = e.target;
    appointByEmployee(value);
  }

  const columns = [
    {
      title: "Cliente",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Servicio",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Empleado",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Preferencias",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Recordar",
      dataIndex: "reminder",
      key: "reminder",
      render: (reminder) => (reminder === true ? "Recordar" : "No recordar"),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === true ? "Finalizado" : "En Proceso"),
    },
    {
      title: "Pago",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (isPaid === true ? "Cancelado" : "Pendiente"),
    },
    {
      title: "Comienzo",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) =>
        startTime && dayjs(startTime).format("DD MMMM YYYY HH:mm:ss"),
    },
    {
      title: "Hasta",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) =>
        endTime && dayjs(endTime).format("DD MMMM YYYY HH:mm:ss"),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (appointment) => (
        <>
          <Link to={`/appointment/update/${appointment.appointmentId}`}>
            <Button
              className="table-actions-buttons"
              type="link"
              icon={<i className="fa-solid fa-pen-to-square"></i>}
            />
          </Link>
          <Popconfirm
            title="¿Estás seguro de eliminar esta cita?"
            onConfirm={() => onClickDestroy(appointment.appointmentId)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              className="table-actions-buttons"
              type="link"
              icon={<i className="fa-solid fa-trash" />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  const mensajeSemana = `CITAS:\n\n${allAppointments
    .map(
      (appoint) =>
        `📅 *${dayjs(appoint.startTime).format("DD/MM/YYYY")}*\n⏰ *${dayjs(
          appoint.startTime
        ).format("HH:mm")}*\n👤 *${appoint.clientName}*\n${
          appoint.serviceName
        }\n\n`
    )
    .join("")}`;

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <div
      className="reusable-body"
      style={{ height: "100%", paddingBottom: "50px" }}
    >
      <Title style={{ fontFamily: "Poppins" }}>Agenda</Title>
      <div className="filter-container">
        <div className="filter-button-container">
          <button
            className="filter-button"
            type="submit"
            onClick={_onClickAppointByDate}
          >
            <i class="fa-solid fa-filter"></i>
            Agenda semanal
          </button>
          <button
            className="filter-button"
            type="submit"
            onClick={_onClickGainByDay}
          >
            <i class="fa-solid fa-sun"></i>
            Agenda por dia
          </button>
          <button
            className="filter-button"
            type="submit"
            onClick={onClickCleanFilter}
          >
            <i class="fa-solid fa-filter-circle-xmark"></i>
            Limpiar filtros
          </button>
        </div>
        <div className="filter-content-wrapper">
          <span className="filter-content-text">Agenda por fecha</span>
          <input
            className="filter-content-input"
            onChange={_onChangeDay}
            type="date"
            name="day"
          />
        </div>
        <div className="filter-content-wrapper">
          <form className="filter-content-wrapper" onSubmit={onChangeOnSubmit}>
            <div className="filter-content-startEnd-container">
              <span className="filter-content-text">
                Agenda por inicio y fin
              </span>
              <input
                className="filter-content-input"
                onChange={_onChangeByDateInput}
                type="date"
                name="start"
              />
              <input
                className="filter-content-input"
                onChange={_onChangeByDateInput}
                type="date"
                name="end"
              />
            </div>
            <button className="filter-content-buttonSubmit" type="submit">
              Filtrar
            </button>
          </form>
        </div>
        <div className="filter-content-wrapper">
          <span className="filter-content-text">Agenda por empleado</span>
          <select
            className="filter-content-select"
            onChange={onChangeAppointByEmployee}
          >
            <option value="">Selecciona un empleado</option>
            {allEmployees?.map((employee, i) => (
              <option
                key={i}
                value={employee.employeeId}
                name={employee.fullName}
              >
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!allAppointments || allAppointments?.length === 0 ? (
        <>
          <Empty description="No hay citas registrados" />
          <Link className="create-container" to="/appointment/create">
            <Button
              type="primary"
              icon={<i className="fa-solid fa-circle-plus"></i>}
            />
          </Link>
        </>
      ) : (
        <div className="inventory-container" style={{ padding: "0" }}>
          <Link className="create-container" to="/appointment/create">
            <Button
              type="primary"
              icon={<i className="fa-solid fa-circle-plus"></i>}
            />
          </Link>
          <Table
            pagination={paginationConfig}
            dataSource={allAppointments}
            columns={columns}
            rowKey="appointmentId"
            style={{ width: "90%" }}
          />
        </div>
      )}

      {allAppointments?.length > 0 && (
        <Button
          className="appoint-button-wssap"
          type="primary"
          icon={<WhatsAppOutlined />}
          onClick={() =>
            window.open(
              `https://web.whatsapp.com/send?text=${encodeURIComponent(
                mensajeSemana
              )}`,
              "_blank"
            )
          }
        >
          Enviar citas
        </Button>
      )}
      <div className="appointment-caledar-container">
        {allAppointments?.length > 0 &&
          allEmployees?.map((employee) => (
            <div
              className="appointment-employeeButton-container"
              key={employee.employeeId}
            >
              <span>{employee.fullName}</span>
              <Link to={`/appointment/calendar/${employee.employeeId}`}>
                <Button type="primary" icon={<CalendarOutlined />} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppointmentAdmin;
