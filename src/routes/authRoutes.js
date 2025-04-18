const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authController');
const { sendResetEmail } = require('../controllers/emailController');
const crypto = require('crypto');
const User = require('../models/userModel');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar un token único
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hora
        await user.save();

        // Enviar correo con el enlace de restablecimiento
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendResetEmail(email, resetLink);

        res.json({ message: 'Correo de recuperación enviado' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};

module.exports = router;