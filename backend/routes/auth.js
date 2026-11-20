
// ================================================
// TECHSTOREPRO - AUTENTICACIÓN DE USUARIOS
// Registro, Login y Perfil
// ================================================

// 1. IMPORTAR DEPENDENCIAS
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/auth');

const router = express.Router();

// ================================================
// 2. DOMINIOS DE CORREO PERMITIDOS
// ================================================

const dominiosPermitidos = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'me.com',
    'mac.com'
];

// ================================================
// 3. REGISTRO DE USUARIOS
// POST /api/auth/registro
// ================================================

router.post('/registro', async (req, res) => {
    try {
        const {
            nombre,
            email,
            password,
            departamento,
            municipio
        } = req.body;

        // Validar nombre
        if (!nombre || nombre.trim().length < 3) {
            return res.status(400).json({
                error: 'El nombre debe tener al menos 3 caracteres'
            });
        }

        // Normalizar correo
        const correo = email ? email.trim().toLowerCase() : '';

        // Validar formato del correo
        if (!/^\S+@\S+\.\S+$/.test(correo)) {
            return res.status(400).json({
                error: 'El correo no es válido'
            });
        }

        // Validar dominio
        const dominio = correo.slice(
            correo.lastIndexOf('@') + 1
        );

        if (!dominiosPermitidos.includes(dominio)) {
            return res.status(400).json({
                error: 'Usa un correo de Gmail, Hotmail, Outlook, Yahoo o iCloud'
            });
        }

        // Validar contraseña
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        // Validar departamento
        if (!departamento) {
            return res.status(400).json({
                error: 'Selecciona un departamento'
            });
        }

        // Validar municipio
        if (!municipio) {
            return res.status(400).json({
                error: 'Selecciona un municipio'
            });
        }

        // Verificar si el correo ya existe
        const existe = await Usuario.findOne({
            email: correo
        });

        if (existe) {
            return res.status(400).json({
                error: 'El email ya está registrado'
            });
        }

        // Encriptar contraseña
        const hash = await bcrypt.hash(password, 10);

        // Crear usuario en MongoDB
        const usuario = await Usuario.create({
            nombre: nombre.trim(),
            email: correo,
            password: hash,
            departamento: departamento,
            municipio: municipio,
            rol: 'cliente'
        });

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            id: usuario._id
        });

    } catch (err) {
        console.error('Error en registro:', err);

        return res.status(500).json({
            error: 'Error interno al crear la cuenta'
        });
    }
});

// ================================================
// 4. INICIO DE SESIÓN
// POST /api/auth/login
// ================================================

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar datos
        if (!email || !password) {
            return res.status(400).json({
                error: 'Ingresa tu correo y contraseña'
            });
        }

        const correo = email.trim().toLowerCase();

        // Buscar usuario
        const usuario = await Usuario.findOne({
            email: correo
        });

        if (!usuario) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        // Comparar contraseña
        const valida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!valida) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        // Verificar secreto JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET no está configurado');
        }

        // Crear token
        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        return res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });

    } catch (err) {
        console.error('Error en login:', err);

        return res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
});

// ================================================
// 5. CONSULTAR PERFIL DEL USUARIO
// GET /api/auth/perfil
// Requiere token JWT
// ================================================

router.get('/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario
            .findById(req.usuario.id)
            .select('-password');

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        return res.json(usuario);

    } catch (err) {
        console.error('Error consultando perfil:', err);

        return res.status(500).json({
            error: 'Error al consultar el perfil'
        });
    }
});

// ================================================
// 6. EXPORTAR RUTAS
// ================================================

module.exports = router;
