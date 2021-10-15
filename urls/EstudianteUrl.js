const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./upload/images'});
const expres=require('express');
const EstudianteController=require('../controllers/EstudianteController');
const router=expres.Router();
router.post('/save',EstudianteController.save);
router.get('/list',EstudianteController.getEstudiantes);
router.get('/estudiante/:id',EstudianteController.getEstudiante);
module.exports=router;