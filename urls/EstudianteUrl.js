
const expres=require('express');
const EstudianteController=require('../controllers/EstudianteController');
const router=expres.Router();
router.get('/datos',EstudianteController.datosestudiante);
router.post('/save',EstudianteController.save);
router.get('/list',EstudianteController.get_estudiantes);
router.get('/buscar/:id',EstudianteController.get_estudiante);
router.delete('/delete/:id',EstudianteController.delete_estudiante);
router.put('/edit/:id',EstudianteController.update_estudiante);
module.exports=router;