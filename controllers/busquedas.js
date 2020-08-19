const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getTodo = async(req, res) => {
    const parametro = req.params.parametro;
    res.json({
        ok: true,
        msg: 'busqueda',
        parametro
    })
}

module.exports = {
    getTodo,
}