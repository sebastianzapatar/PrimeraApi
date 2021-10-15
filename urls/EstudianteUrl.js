const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./upload/images'});
const expres=require('express');
const EstudianteController=require('../controllers/EstudianteController');
const router=expres.Router();
router.post('/save',EstudianteController.save);
module.exports=router;