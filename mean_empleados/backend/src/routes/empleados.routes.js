const { Router }= require('express');
const router=Router();

const validateEmpleadoExistence = require('../middlewares/validateEmpleadoExistence');

const empleado=require('../controllers/empleados.controller.js');
router.get('/',empleado.getEmpleados);
router.post('/', empleado.createEmpleado);
router.get('/:id',empleado.getEmpleado);
//router.put('/:id',empleado.editEmpleado);
//router.delete('/:id', empleado.deleteEmpleado);

router.put('/:id', validateEmpleadoExistence, empleado.editEmpleado);
router.delete('/:id', validateEmpleadoExistence, empleado.deleteEmpleado);


module.exports=router;
