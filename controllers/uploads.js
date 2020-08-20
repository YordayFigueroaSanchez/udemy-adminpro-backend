const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const fileUpload = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['medico', 'hospitale', 'usuario'];

    //Validar tipo
    if (!tiposValidos.includes(tipo)) {
        return res.status(404).json({
            ok: false,
            msg: 'el tipo no es permitido'
        });
    }

    //Validar imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //Procesar imagenes
    res.json({
        ok: true,
        msg: 'uploaded'
    })
}

module.exports = {
    fileUpload,

}