/*
Ruta /api/hospitales
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getHospitales,
    setHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [

], getHospitales);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    setHospitales);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospitales);

router.delete('/:id', [
        validarJWT
    ],
    borrarHospitales);

module.exports = router;