const { replaceOne } = require("../models/usuario");
const jwt = require('jsonwebtoken');
const  Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
    //Leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(uid);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    }
    console.log(token);


}

const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;

    try {
    
        const usuarioDB =  await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario sin permiso'
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Habl con l administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
}