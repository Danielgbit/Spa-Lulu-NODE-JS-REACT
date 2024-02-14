const express = require('express');
const app = express();
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


//Middlewares app;
app.use(express.static('./public'))
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,

}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

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

