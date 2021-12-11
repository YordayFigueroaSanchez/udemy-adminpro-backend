const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { replaceOne } = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'email nombre role google img').skip(desde).limit(4),
        Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        msg: 'get usuarios',
        usuarios,
        total
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
        //generar Token
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
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
        const { password, google, email, ...campos } = req.body;
        if (usuarioBD.email !== email) {
            const existeMail = await Usuario.findOne({ email });
            if (existeMail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe'
                });
            }
        }
        if (!usuarioBD.google) {
            
            campos.email = email;
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no puede cambiar su correo'
            });
        }
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

const borrarUsuarios = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        await Usuario.findOneAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    setUsuarios,
    actualizarUsuarios,
    borrarUsuarios,
}