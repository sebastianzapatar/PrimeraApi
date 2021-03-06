const Estudiante=require('../models/EstudianteModel');
const fs=require('fs');
const path=require('path');
const controller={
    datosestudiante:(req,res)=>{
        console.log("Soy el controlador tio");
        return res.status(200).send({
            nombre:'Steven',
            apellido:'Dominguez'
        })
    },
    getImage:(req,res)=>{
        const file=req.params.image;
        const path_file='./upload/images/'+file;
        fs.stat(path_file,(error,exit)=>{
            if(error){
                return res.status(404).send({
                    status:'error',
                    message:'Imagen no encontrada'
                })
            }
            return res.sendFile(path.resolve(path_file));
        })
    },
    upload:(req,res)=>{
        let file_name='Imagen no subida';
        if(!req.files){
            return res.status(400).send({
                status:'error',
                message:file_name
            })
        }
        const file_path=req.files.file0.path;
        const file_split=file_path.split('\\');
        file_name=file_split[2];
        const file_extension=file_name.split('.')[1];
        console.log(file_extension);
        if(file_extension!='png' && file_extension!='jpg'
        && file_extension!='jpeg' && file_extension!='gif'){
            
            return res.status(400).send({
                status:'error',
                message:'not valid extension'
            })
        
        }
        else{
            const id=req.params.id;
            Estudiante.findOneAndUpdate({_id:id},{image:file_name},
                {new:true},(err,estudianteact)=>{
                    if(err){
                        return res.status(500).send({
                            status:'Error',
                            message:'Error al guardar la imagen'
                        })
                    }
                    return res.status(200).send({
                        status:'exito',
                        estudianteact
                    })
                })
        }
        
    },
    search:(req,res)=>{
        const buscar=req.params.dato;
        Estudiante.find({"$or":[
            {"nombre":new RegExp(buscar,'i')},
            {"apellidos":new RegExp(buscar,'i')},
            {"email":new RegExp(buscar,'i')}
        ]}).exec((err,estudiantes)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Contacte al admin'
                })
            }
            return res.status(200).send({
                status:'exito',
                estudiantes
            })
        })
    },
    save:(req,res)=>{
        /*
        1. Recoger los datos
        2. Validar los datos
        3. Crea el objeto
        4. Lo guarda
        5. Se devuelve una respuesta
        */
       const {nombre,apellido}=req.body;
       try {
           if(nombre.length>0 && apellido.length>0){
                const estudiante= new Estudiante();
                estudiante.nombre=nombre;
                estudiante.apellidos=apellido;
                estudiante.save((err,estudiante)=>{
                    if(err || !estudiante){
                        return  res.status(400).send({
                            status:'Fail',
                            message:'no hubo forma mono'
                        })
                    }
                    else{
                        return res.status(200).send({
                            status:'exito',
                            estudiante
                        })
                    }
                })
           }
           else{
               return res.status(401).send({
                   status:false,
                   message:'Faltan datos'
               })
           }
       } catch (error) {
           console.log("Error mono");
           return res.status(401).send({
            status:false,
            message:'Contacte al admin'
        })
       }
       
    },
    get_estudiantes:(req,res)=>{
        Estudiante.find({}).sort('_id').exec((err,estudiantes)=>{
            if(err){
                return res.status(400).send({
                    status:'error',
                    message:'No se pudo mai ni??o'
                })
            }
            return res.status(200).send({
                status:'ok',
                estudiantes
            })
        })
    },
    get_estudiante:(req,res)=>{
        //Recoger el id de la URL
        const {id}=req.params;
        console.log(id);
        if(!id || id==null){
            return res.status(500).send({
                status:'malo',
                message:'Error al devolver los datos',
                
            })
        }
        Estudiante.findById(id,(err,estudiante)=>{
            if(err){
                return res.status(500).send({
                    status:'malo',
                    message:'Error al devolver los datos',
                })
            }
            if(!estudiante){
                return res.status(500).send({
                    status:'malo',
                    message:'No existe el id',
                    
                })
            }
            return res.status(200).send({
                status:'Melisimo',
                estudiante
            })
        })
      
    },
    delete_estudiante:(req,res)=>{
        const {id}=req.params;
        console.log(id);
        if(!id || id==null){
            return res.status(500).send({
                status:'malo',
                message:'Error al devolver los datos',
                
            })
        }
        else{
            Estudiante.deleteOne({_id:id},(err,estudiante)=>{
                if(err || !estudiante){
                    return res.status(500).send({
                        status:'malo',
                        message:'No existe el id',
                        
                    })
                }
                return res.status(200).send({
                    status:'ok',
                    estudiante
                })
            })
        }
    },
    update_estudiante:(req,res)=>{
        /*
        1. Recoger los datos
        2.Validamos
        3. Buscamos y actualizamos
        */
        const {nombre,apellido}=req.body;
        const {id}=req.params;
        try{
            if(nombre.length>0 && apellido.length>0){
                Estudiante.updateOne({_id:id},req.body,
                    {new:true},(err,estudiante)=>{
                        if(err){
                            return res.status(500).send({
                                status:'fail',
                                message:'Contacte el admin'
                            })
                        }
                        return res.status(200).send({
                            status:'ok',
                            estudiante
                        })
                    })
            }
            else{

            }
        }
        catch(error){
            console.log('Contacte el administrador');

        }
    }
}
module.exports=controller;