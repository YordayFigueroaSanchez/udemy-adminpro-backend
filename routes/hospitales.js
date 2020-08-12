/*
Ruta /api/hospitales
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, 
        setHospitales, 
        actualizarHospitales, 
        borrarHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
[

]
,getHospitales);

router.post('/', 
    [

    ],
    setHospitales);

router.put('/:id', 
    [

    ], 
    actualizarHospitales);

router.delete('/:id',
    [

    ],
    borrarHospitales);

module.exports = router;