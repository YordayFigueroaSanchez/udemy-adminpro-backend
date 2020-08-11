const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        //validar usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el usuario'
            })
        }
        //validar contrasenna
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password no valido'
            });
        }
        //generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
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
    login,
}