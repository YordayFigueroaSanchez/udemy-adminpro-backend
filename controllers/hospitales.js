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
    const id = req.params.id;
    const uid = req.uid;
    console.log(uid);
    try {
        const hospital = await Hospital.findById(id);
        console.log(hospital);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        console.log(cambiosHospital);
        const hospitalActualizado = await Hospital.findByIdAndUpdate(
            id,
            cambiosHospital, { new: true }
        );
        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte con el administrador'
        })
    }
}

const borrarHospitales = async(req, res = response) => {
    const id = req.params.id;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(
            id
        );
        res.json({
            ok: true,
            msg: 'Hospital borrado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte con el administrador'
        })
    }
}

module.exports = {
    getHospitales,
    setHospitales,
    actualizarHospitales,
    borrarHospitales,
}