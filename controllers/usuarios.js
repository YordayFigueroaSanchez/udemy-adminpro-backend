const Usuario = require('../models/usuario');

const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'get usuarios',
        usuarios: [{
            id: 123,
            nombre: 'Fernando'
        }]
    })
}

const setUsuarios = async(req, res) => {
    //console.log(req.body);
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