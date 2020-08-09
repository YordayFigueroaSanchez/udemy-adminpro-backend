const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'email nombre role google');
    res.json({
        ok: true,
        msg: 'get usuarios',
        usuarios
    })
}

const setUsuarios = async(req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeMail = await Usuario.findOne({ email });
        if (existeMail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        await usuario.save();
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...mirar log'
        });
    }

}

const actualizarUsuarios = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }
        // Actualizaciones
        const campos = req.body;
        console.log(campos);
        if (usuarioBD.email === req.body.email) {
            delete campos.email;
        } else {
            const existeMail = await Usuario.findOne({ email: req.body.email });
            if (existeMail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe'
                });
            }
        }

        delete campos.password;
        delete campos.google;
        console.log(campos);

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    setUsuarios,
    actualizarUsuarios,
}