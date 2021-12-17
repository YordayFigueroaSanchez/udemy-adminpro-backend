/*
Ruta /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, setUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    validarJWT,
    getUsuarios);

router.post('/', [
        //validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    setUsuarios);

router.put('/:id', [
    validarJWT,
    validarADMIN_ROLE_o_mismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuarios);

router.delete('/:id',
    validarJWT,
    borrarUsuarios);

module.exports = router;