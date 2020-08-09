/*
Ruta /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, setUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/',
    getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    setUsuarios);

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuarios);

router.delete('/:id', borrarUsuarios);

module.exports = router;