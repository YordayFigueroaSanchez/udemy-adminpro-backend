const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        usuarios: [{
            id: 123,
            nombre: 'Fernando'
        }]
    })
}

module.exports = {
    getUsuarios,
}