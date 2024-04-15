import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Link } from 'react-router-dom';

dayjs.locale('es');


const AppointCalendar = ({ availabilities, destroyAppointment }) => {
    
    const _destroyAppointment = (id) => {
        destroyAppointment(id);
    };

    const localizer = dayjsLocalizer(dayjs);
    
    const events = availabilities?.map((availability) => ({
        id: availability.availabilityAppointments?.map(appointment => appointment.appointmentId),
        title: availability.availabilityAppointments.map(appointment => appointment.serviceName),
        start: dayjs(availability.startTime).toDate(),
        end: dayjs(availability.endTime).toDate(),
    }));

    const components = {
        event: (props) => {
            return <div>
                {props.event.title}
                <Link to={`/appointment/update/${props.event.id}`}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </Link>
                <i onClick={() => _destroyAppointment(props.event.id)} class="fa-solid fa-trash"></i>
            </div>
        }
    }
    
    return (
        <div className='calendar-container'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView='month'
                components={components}
                selectable
                views={['month', 'week', 'day']}
            />
        </div>
    )
};

export default AppointCalendar