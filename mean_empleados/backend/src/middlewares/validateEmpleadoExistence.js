const Empleado = require('../models/Empleado');

async function validateEmpleadoExistence(req, res, next) {
  const { id } = req.params;
  const empleado = await Empleado.findById(id);

  if (!empleado) {
    return res.status(404).send('Empleado no encontrado');
  }

  // Guarda el empleado en el objeto req para que esté disponible para los siguientes middlewares/rutas
  req.empleado = empleado;
  next();
}

module.exports = validateEmpleadoExistence;