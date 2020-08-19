const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async(req, res) => {
    const parametro = req.params.parametro;
    const regex = new RegExp(parametro, 'i');
    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ]);
    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}

module.exports = {
    getTodo,
}