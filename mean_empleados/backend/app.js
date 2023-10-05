const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');


//settings
app.set('puerto', process.env.PORT || 3000);
app.set('nombreApp', 'Gestión de empleados');

app.use(morgan('dev'));

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'})); 
let instance = null;

module.exports = {
    getInstance: function() {
        if (!instance) {
            instance = app;
            require('./database');
            app.use('/api/empleados', require('./src/routes/empleados.routes'));
        }
        return instance;
    }
};

