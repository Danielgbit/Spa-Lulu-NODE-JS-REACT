const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const mainRouter = require('./routes/mainRoute');
const productsRouter = require('./routes/productsRoute');
const serviceRouter = require('./routes/serviceRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const reservationRouter = require('./routes/reservationRoute');
const appointmentRouter = require('./routes/appointmentsRoute');
const clientRouter = require('./routes/clientRoute');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza esto con la URL de tu aplicación React
    credentials: true, // Habilita el intercambio de cookies o encabezados de autorización
  }));
  
  
app.use(session({
    secret: 'kafIG#$1%66&dKVm°12||dVñ{[Ñ-Cmc__-}s{afGBv',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
  }));

//Middlewares app;

app.use(express.static('./public'))
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cookieParser());


app.use('/', mainRouter);
app.use('/product', productsRouter);
app.use('/service', serviceRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/reserve', reservationRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);


app.listen(4000, () => {
    console.log('funcionando en el puerto http://localhost:4000');
});

