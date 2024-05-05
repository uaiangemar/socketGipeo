const BandList = require("./band-list");


class Sockets {

    io;
    bandList;

    constructor( io ) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }


    socketEvents() {
        // On conecctions
        let clientes = 0;
        this.io.on('connection', ( socket ) => {
            clientes++;
            console.log('cliente conectado... ', clientes );

            /* GIPEO */
            socket.on('enviar-mensaje-responsable', ( { emisor, receptor, mensaje } ) => {
                console.log(emisor, receptor, mensaje);
                
                this.io.emit('nuevo-mensaje-planificador', { emisor, receptor, mensaje });
            });

            socket.on('enviar-mensaje-planificador', ( { emisor, receptor, mensaje } ) => {
                console.log(emisor, receptor, mensaje);
                this.io.emit('nuevo-mensaje-responsable', { emisor, receptor, mensaje });
            })


          


            /* GIPEO */

            socket.emit('mensaje-nuevo', )

            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());


            // Votar una banda
            socket.on('votar-banda', ( id ) => {
                this.bandList.increaseVotes( id );
                this.io.emit('current-bands', this.bandList.getBands());
            })


            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand( id );
                this.io.emit('current-bands', this.bandList.getBands());
            })

        });
    }

}


module.exports = Sockets;