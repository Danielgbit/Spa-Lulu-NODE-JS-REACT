import ReservationFormComponent from "../../components/Bookings/ReservationFormComponent";

const BookingPageComponent = () => {
    return(
        <div className="booking-page-container-max">
            <div className="booking-page-container-text-welcome">
                <h1>Reservas</h1>
                <i class="fa-brands fa-slack"></i>
                <p>"Descubre un oasis de relajación y bienestar. ¡Reserva ahora y sumérgete en una experiencia rejuvenecedora que te llevará a un mundo de tranquilidad y renovación!"</p>
            </div>
            <ReservationFormComponent/>
        </div>
    );
};

export default BookingPageComponent;