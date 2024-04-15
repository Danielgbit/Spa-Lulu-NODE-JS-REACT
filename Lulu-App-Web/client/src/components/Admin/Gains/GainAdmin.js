import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../../utils/numberFormat'
import { Table, Typography, Empty, Button } from 'antd';
import { useSpring, animated } from 'react-spring';


const GainAdmin = ({ gains, onClickDestroy, onClickGainByDate, 
  loadGains, onClickGainByDay, onChangeDay, gainByStartAndEnd, employees,
  gainByEmployee, loadGainByCategory, loadGainByMethodCheckout }) => {

    const { Title } = Typography;
    const [ total, setTotal ] = useState(0);
    const [ date, setDate ] = useState({});

    const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 500,
    });


    function totalProfits() {
      if (gains.length > 0) {
        const total = gains.reduce((accum, current) => {
            return accum + current.amount;
        }, 0);
        setTotal(total);
      };
    };

    useEffect(() => { totalProfits(); }, [gains]);

    const _onClickDestroy = (id) => { onClickDestroy(id); };

    const _onClickGainByDate = () => { onClickGainByDate(); };

    const _onClickGainByDay = () => { onClickGainByDay(); };

    const onClickCleanFilter = () => { loadGains(); };

    const _onChangeDay = (e) => { const { value } = e.target; onChangeDay(value); };


    function _onChangeByDateInput(e) {
      const { value, name } = e.target;
      setDate({...date, [name]: value});
    }

    function onChangeOnSubmit(e) {
        e.preventDefault();
        gainByStartAndEnd(date);
    }

    function onChangeGainByEmployee (e){
        const { value } = e.target;
        gainByEmployee(value);
    };

    function onChangeGainByCategory (e) {
        const { value } = e.target;
        loadGainByCategory(value);
    };

    function onChangeGainByMethodCheckout (e) {
      const { value } = e.target;
      loadGainByMethodCheckout(value);
  };

  const columns = [
    {
      title: 'Empleado',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Fecha',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Link to={`/gain/update/${record.gainId}`}>
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
          <Button className='table-actions-buttons' type="link" icon={<i className="fa-solid fa-trash" />} onClick={() => _onClickDestroy(record.gainId)} />
        </>
      ),
    },
  ];


  const paginationConfig = {
    pageSize: 6,
  };

    return (
    <animated.div style={fadeInProps}>
      <div className='reusable-body' style={{ height: '100%', padding: '20px' }}>
            <Title style={{ fontFamily: 'Poppins' }}>Ingresos</Title>
                  <div className='filter-container'>
                    <div className='filter-button-container'>
                      <button className='filter-button' type="submit" onClick={_onClickGainByDate} >
                        <i class="fa-solid fa-filter"></i> 
                        Ingreso semanal 
                      </button>
                      <button className='filter-button' type="submit" onClick={_onClickGainByDay} >
                        <i class="fa-solid fa-sun"></i>
                        Ingreso por dia
                      </button>
                      <button className='filter-button' type="submit" onClick={onClickCleanFilter} >
                      <i class="fa-solid fa-filter-circle-xmark"></i>
                      Limpiar filtros
                    </button>
                    </div>
                    <div className='filter-content-wrapper'>
                      <span className='filter-content-text'>Ingresos por fecha</span>
                      <input className='filter-content-input' onChange={_onChangeDay} type='date' name='day'/>
                    </div>
                    <div className='filter-content-wrapper'>
                      <form className='filter-content-wrapper' onSubmit={onChangeOnSubmit}>
                        <div className='filter-content-startEnd-container'>
                          <span className='filter-content-text'>Ingresos por inicio y fin</span>
                          <input className='filter-content-input' onChange={_onChangeByDateInput} type='date' name='start'/>
                          <input className='filter-content-input' onChange={_onChangeByDateInput} type='date' name='end'/>
                        </div>
                        <button className='filter-content-buttonSubmit' type="submit">Filtrar</button>
                      </form>
                    </div>
                    <div className='filter-content-wrapper' >
                      <span className='filter-content-text'>Ingresos por empleado</span>
                        <select className='filter-content-select' onChange={onChangeGainByEmployee}>
                          <option value='' >Selecciona un empleado</option>
                            { employees?.map((employee, i) => (
                                <option key={i} value={employee.employeeId} name={employee.fullName} >{employee.fullName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='filter-content-wrapper' >
                      <span className='filter-content-text'>Ingresos por categoria</span>
                      <select className='filter-content-select' onChange={onChangeGainByCategory}>
                            <option value="">Selecciona una categoria</option>
                            <option value="servicio">Servicio</option>
                            <option value="producto">Producto</option>
                            <option value="comision">Comision</option>
                            <option value="propina">Propina</option>
                        </select>
                    </div>
                    <div className='filter-content-wrapper' >
                      <span className='filter-content-text'>Ingresos por tipo de pago</span>
                          <select className='filter-content-select' onChange={onChangeGainByMethodCheckout}  >
                            <option value="">Selecciona tipo de pago</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta de credito</option>
                            <option value="transferencia">Transferencia bancaria</option>
                      </select>
                  </div>
                </div>
                {
                gains?.length === 0 || !gains ? (
                      <Empty description="No hay ingresos registrados" />
                      ) : (
                        <>
                          <span style={{
                              display: 'flex',
                              flexDirection: 'column',
                              fontFamily: 'Poppins', 
                              fontSize: '1rem', 
                              color: 'black',
                              backgroundColor: '#eec9ff',
                              padding: '0 10px',
                              borderRadius: '5px',
                              boxShadow: '4px 5px 11px -5px rgba(0,0,0,0.75)'

                            }} >TOTAL: {formatNumber(total)}</span>
                          <div className='inventory-container'>
                              <Link className='create-container' to={`/gain/create`}>  
                                <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
                              </Link>
                              <Table className='table-container' dataSource={gains} columns={columns} rowKey="gainId" pagination={paginationConfig} />
                          </div>
                        </>
                  )
                }
            </div>
          </animated.div>
        )
}

export default GainAdmin