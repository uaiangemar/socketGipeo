const { Router } = require('express');

const router = Router();

const webpush = require('../models/web-push');


let pushSubscriptionClient;

router.post('/subscription', async ( req, res ) => {
    console.log(req.body);
    pushSubscriptionClient = req.body;
    // res.status(200).json();

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
       await webpush.sendNotification( pushSubscriptionClient, JSON.stringify(payload) )
            .then( result => {
                console.log('Enviado....', result)
                res.status(200).json({message: 'Newsletter sent successfully.'})
            })
            .catch( error => {
                console.log('Error...', error)
                res.sendStatus(500);
            });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;