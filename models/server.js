// SERVIDOR EXPRESS
const express   = require('express');
const http      = require('http');
const socketIo  = require('socket.io');
const path      = require('path');
const cors      = require('cors');
const morgan    = require('morgan');
const Sockets   = require('./socket');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer( this.app );


        // configuración de sockets
        this.io = socketIo( this.server, { cors: {
            origin: "*",
            methods: ["GET", "POST"]
          } } );

    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public')  + '') );

        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

        this.app.use(require('../routes/index'), { cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }})

        //CORS
        this.app.use( cors() );
    }

    configurarSocket() {
        new Sockets( this.io );
    }

    execute() {
        // Inicializar middlewares...
        this.middlewares();

        //Inicializar sockets
        this.configurarSocket();

        // Inicializar servidor...
        this.server.listen( this.port, () => {
            console.log('Server corriendo en el puerto: ', this.port );
        })
    }
}


module.exports = Server;