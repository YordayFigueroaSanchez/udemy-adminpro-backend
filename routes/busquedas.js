/*
Ruta /api/busqueda
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {
    getTodo,
    getColeccion
} = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:parametro', [
    validarJWT
], getTodo);

router.get('/coleccion/:tabla/:parametro', [
    validarJWT
], getColeccion);

module.exports = router;