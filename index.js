const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { dbConnection } = require('./database/config');

//crear un servidor de express
const app = express();

//configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//database
dbConnection();

//directorio publico
app.use(express.static('public'));

//console.log(process.env);

//user01
//LQOB5iwxsTfUKkL8

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/busqueda', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
        console.log('escuchando por el puerto ' + process.env.PORT);
    }

);