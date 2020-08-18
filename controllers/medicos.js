const { response } = require('express');
const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const { replaceOne } = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, res) => {
    // const usuarios = await Usuario.find({}, 'email nombre role google');
    res.json({
        ok: true,
        msg: 'get medicos'
    })
}

const setMedicos = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminsitrador'
        })
    }
}

const actualizarMedicos = async(req, res = response) => {
    const uid = req.params.id;
    res.json({
            ok: true,
            msg: 'actualizar medicos'
        })
        /* try {
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
            campos.email = email;
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
        } */
}

const borrarMedicos = async(req, res = response) => {
    const uid = req.params.id;
    res.json({
            ok: true,
            msg: 'borrar medicos'
        })
        /* try {
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
        } */
}

module.exports = {
    getMedicos,
    setMedicos,
    actualizarMedicos,
    borrarMedicos,
}