const config = require('./../configs/' + process.env.NODE_ENV);
const nodemailer = require('nodemailer');

const email = {

    sendRegister: function (contact) {

        const transporter = nodemailer.createTransport({
            host: config.email.host,
            auth: config.email.auth
        });

        let mailOptions = {
            from: config.email.from,
            to: contact.emailAddress
        };

        return new Promise((rej, res) => {

            const name = `${contact.firstName} ${contact.lastName}`;
            const href = `${config.client.host}:${config.client.port}?token=${contact.token}`;
            const link = `<a href='${href}'>${href}</a>`;

            mailOptions.subject = 'Crossblood Team, Thanks for register';

            mailOptions.html = `<p>Hi ${name}s,</p>
            <p>Thanks for register, here is your private link for update your profile: ${link}</p>
            <hr>
            <p>Best regards,</p>
            <p>Crossblood Team</p>`; 

            transporter.sendMail(mailOptions, (err, info) => {

                console.log(err, info);

                if (err) {
                    rej(err);
                } else {
                    console.log(`email send to ${name} <${contact.emailAddress}>`);
                    res(info);
                }

            });

        });

    }

}

module.exports = email;