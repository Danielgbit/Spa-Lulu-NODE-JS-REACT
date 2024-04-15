const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan');

//ROUTES
const mainRouter = require('./routes/mainRoute');
const productsRouter = require('./routes/productsRoute');
const serviceRouter = require('./routes/serviceRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const reservationRouter = require('./routes/reservationRoute');
const appointmentRouter = require('./routes/appointmentsRoute');
const clientRouter = require('./routes/clientRoute');
const employeeRouter = require('./routes/employeeRoute');
const inventoryRouter = require('./routes/inventoryRoute');
const gainRouter = require('./routes/gainRoute');
const expenseRouter = require('./routes/expenseRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');



const { PORT } = require('./config');

const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza esto con la URL de tu aplicación React
    credentials: true, // Habilita el intercambio de cookies o encabezados de autorización
  }));
  
//Middlewares app;

app.use(express.static('./public'))
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cookieParser());
app.use(morgan('dev'));


app.use('/', mainRouter);
app.use('/product', productsRouter);
app.use('/service', serviceRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/reserve', reservationRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);
app.use('/employee', employeeRouter);
app.use('/inventory', inventoryRouter);
app.use('/gain', gainRouter);
app.use('/expense', expenseRouter);
app.use('/payment', paymentRoute);
app.use('/order', orderRoute);





app.listen(PORT, () => {
    console.log(`funcionando en el puerto http://localhost:${PORT}`);
});

