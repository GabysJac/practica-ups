const empleadoCtrl={};

const Empleado = require('../models/Empleado');
empleadoCtrl.getEmpleados= async(req, res)=>
{
    const empleados= await Empleado.find();
    res.json(empleados);
}


empleadoCtrl.createEmpleado= async(req,res)=>{
    console.log('req', req.body)
    try {
        const empleado=new Empleado({
            nombre: req.body.nombre,
            cargo: req.body.cargo,
            departamento:req.body.departamento,
            sueldo:req.body.sueldo
        });
        console.log(empleado);
        await empleado.save();
        res.json('status: Datos guardados');
    }catch (err){
        res.status(500).send('No guardo ');
    }

}
empleadoCtrl.getEmpleado= async (req,res)=>{
    console.log('req.param.id', req.params.id)
    const empleado= await Empleado.findById(req.params.id);
    res.json(empleado);
}
empleadoCtrl.editEmpleado = async (req, res) => {
    const updatedEmpleado = await Empleado.findByIdAndUpdate(req.empleado._id, req.body, { new: true });
    res.json(updatedEmpleado);
};
empleadoCtrl.deleteEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.empleado._id);
    res.json('Empleado eliminado');
};
module.exports=empleadoCtrl;
