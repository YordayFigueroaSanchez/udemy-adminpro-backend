/*
Ruta /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, setUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);

router.post('/', setUsuarios);

module.exports = router;