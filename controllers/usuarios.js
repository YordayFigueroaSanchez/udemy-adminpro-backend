const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'email nombre role google');
    res.json({
        ok: true,
        msg: 'get usuarios',
        usuarios
    })
}

const setUsuarios = async(req, res) => {
    const usuario = new Usuario(req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario

    })
}

module.exports = {
    getUsuarios,
    setUsuarios,
}