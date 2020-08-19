const { response } = require('express');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { replaceOne } = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre');
    res.json({
        ok: true,
        hospitales
    })
}

const setHospitales = async(req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminsitrador'
        })
    }

}

const actualizarHospitales = async(req, res = response) => {
    const uid = req.params.id;
    res.json({
            ok: true,
            msg: 'actualizar hospitales'
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

const borrarHospitales = async(req, res = response) => {
    const uid = req.params.id;
    res.json({
            ok: true,
            msg: 'borrar hospitales'
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
    getHospitales,
    setHospitales,
    actualizarHospitales,
    borrarHospitales,
}