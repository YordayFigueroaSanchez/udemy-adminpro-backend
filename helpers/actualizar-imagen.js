const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    console.log('Todo bien');
    switch (tipo) {
        case 'medico':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            const pathViejo = `./uploads/medico/${medico.img}`;
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospital':

            break;
        case 'usuario':

            break;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}