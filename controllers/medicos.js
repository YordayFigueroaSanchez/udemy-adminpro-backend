const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { replaceOne } = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, res) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
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
    const id = req.params.id;
    const uid = req.uid;
    const idHospital = req.body.idHospital;
    const nombre = req.body.nombre;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }
        const hospital = await Hospital.findById(idHospital);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        const cambiosMedico = {
            nombre: nombre,
            usuario: uid,
            hospital: hospital._id
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,
            cambiosMedico, { new: true }
        );
        res.json({
            ok: true,
            medico: medicoActualizado
        })

        res.json({
            ok: true,
            msg: 'actualizar medicos',
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador'
        });
    }


}

const borrarMedicos = async(req, res = response) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }
        await Medico.findByIdAndDelete(
            id
        );
        res.json({
            ok: true,
            msg: 'Medico borrado'
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
    getMedicos,
    setMedicos,
    actualizarMedicos,
    borrarMedicos,
}