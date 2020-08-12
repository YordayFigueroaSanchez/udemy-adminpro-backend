/*
Ruta /api/medicos
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, 
        setMedicos, 
        actualizarMedicos, 
        borrarMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
[

]
,getMedicos);

router.post('/', 
    [

    ],
    setMedicos);

router.put('/:id', 
    [

    ], 
    actualizarMedicos);

router.delete('/:id',
    [

    ],
    borrarMedicos);

module.exports = router;