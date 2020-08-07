const { response } = require('express');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');
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
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    try {
        const existeMail = await Usuario.findOne({ email });
        if (existeMail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);
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

module.exports = {
    getUsuarios,
    setUsuarios,
}