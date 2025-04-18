const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../utils/emailService');
const crypto = require('crypto');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Verificar que el token no haya expirado
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña y eliminar el token
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};