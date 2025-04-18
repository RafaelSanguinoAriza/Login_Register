const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendResetEmail = async (email, token) => {
    const resetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`;
    await transporter.sendMail({
        from: `"Soporte" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    });
};