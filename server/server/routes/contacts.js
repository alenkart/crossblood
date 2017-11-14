const mongodb = require('./../core/mongodb');
const router = require('express').Router();

router.get('/', (req, res) => {

    res.send('hello');
});

router.get('/select', (req, res) => {

    mongodb().then(db => {

        db.collection('contact')
            .find({ status: true })
            .toArray((err, dbres) => {

                db.close();
                res.send(dbres);
            });

    }).catch(console.error);

});

router.post('/register', (req, res) => {

    const email = require('./../utils/email');

    let contact = req.body;

    const ip = req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.ip;

    mongodb().then(db => {

        generateToken()
            .then((token) => {
                contact.token = token;
                return contact;
            }).then(contact => saveContact(db, contact))
            .then(email.sendRegister)
            .catch(err => console.error(err));

    }).catch(err => console.error(err));

});

function generateToken(size) {

    size = size || 8;

    const crypto = require('crypto');

    return new Promise((res, rej) => {

        crypto.randomBytes(size, function (err, buffer) {

            if (err) {
                rej(err)
            } else {
                res(buffer.toString('hex'));
            }

        });

    });

}

function saveContact(db, contact) {

    return new Promise((res, rej) => {

        db.collection('contact').insert(contact, (err, dbres) => {

            db.close();

            if (err) {
                rej(err);
            } else {
                res(contact);
            }

        });

    });

}

module.exports = router;