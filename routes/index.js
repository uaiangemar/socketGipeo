const { Router } = require('express');

const router = Router();

const webpush = require('../models/web-push');


let pushSubscriptionClient;

router.post('/subscription', ( req, res, next ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );

    console.log('body: ', req.body);
    pushSubscriptionClient = req.body;
    // res.status(200).json();
    res.status(200).json({message: 'Newsletter sent successfully.', data: req.body})

    const payload = 
    {
        notification: {
            title: 'Notificación Gipeo',
            image: '../public/assets/images/logoGipeo.png',
            message: 'Nuevo mensaje',
            vibrate: [100, 50, 100]
        }
    }
        
    

    try {
       webpush.sendNotification( pushSubscriptionClient, JSON.stringify(payload) )
            .then( result => {
                console.log('Enviado....', result)
            })
            .catch( error => {
                console.log('Error...', error)
            });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;