/*
Ruta /api/usuarios
 */
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        usuarios: [{
            id: 123,
            nombre: 'Fernando'
        }]
    })
});

module.exports = router;