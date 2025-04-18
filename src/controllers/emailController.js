const nodemailer = require('nodemailer');

// Crear una cuenta de prueba en Ethereal
async function createTransporter() {
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 465, 
        secure: true, 
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
}

exports.sendResetEmail = async (email, resetLink) => {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
        from: '"Soporte" <no-reply@example.com>',
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    console.log('Mensaje enviado: %s', info.messageId);
    console.log('Vista previa del mensaje: %s', nodemailer.getTestMessageUrl(info));
};