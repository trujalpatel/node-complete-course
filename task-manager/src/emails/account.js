const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'trujal.patel@mobiosolutions.com',
        subject: 'Welcome!',
        text: `Welcome to the app, ${name}. This is testing mail`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'trujal.patel@mobiosolutions.com',
        subject: 'Account Removed!',
        text: `Hi, ${name}. Your account has been removed`
    })
}
sgMail.send({
    to: 'trujal.patel@mobiosolutions.com',
    from: 'trujal.patel@mobiosolutions.com',
    subject: 'Testing mail!',
    text: 'This is a sendgrid testing mail'
});

module.exports = { sendWelcomeEmail, sendCancelationEmail }