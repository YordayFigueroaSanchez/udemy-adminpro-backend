/*
Ruta /api/medicos
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    setMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
} = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [
        validarJWT
    ], 
    getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    setMedicos);

router.put('/:id', [
        validarJWT
    ],
    actualizarMedicos);

router.delete('/:id', [
    validarJWT
    ],
    borrarMedicos);

router.get('/:id', [
        validarJWT
        ],
        getMedicoById);

module.exports = router;