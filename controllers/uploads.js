const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const { v4: uuidv4 } = require('uuid');

const fileUpload = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['medico', 'hospital', 'usuario'];

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

    //Procesar imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validad extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no se permite la extension'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        res.json({
            ok: true,
            msg: 'uploaded',
            nombreArchivo
        })
    });


}

module.exports = {
    fileUpload,

}