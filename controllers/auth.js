const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        console.log(name, email, picture);
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB);
        let usuario;
        if (!usuarioDB) {
            //si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
            console.log("prueba no existe usuario");
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            console.log("prueba existe usuario");
        }
        //Guardar en DB
        await usuario.save();

        //generar Token
        const tokenJWT = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google Singin',
            tokenJWT,
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }

}
module.exports = {
    login,
    googleSingIn,
}