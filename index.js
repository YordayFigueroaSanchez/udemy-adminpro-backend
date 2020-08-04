const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { dbConnection } = require('./database/config');

//crear un servidor de express
const app = express();

//configurar CORS
app.use(cors());

//database
dbConnection();

//console.log(process.env);

//user01
//LQOB5iwxsTfUKkL8

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));


app.listen(process.env.PORT, () => {
        console.log('escuchando por el puerto ' + process.env.PORT);
    }

);