const Estudiante=require('../models/EstudianteModel');
const fs=require('fs');
const path=require('path');
const { ok } = require('assert');
const controller={
    save:(req,res)=>{
        /*
        1. Recoger los datos
        2. Validar los datos
        3. Crea el objeto
        4. Lo guarda
        5. Se devuelve una respuesta
        */
       const {nombre,apellido}=req.body;
       console.log(req.body);
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
    getEstudiantes:(req,res)=>{
        Estudiante.find({}).sort('apellidos').exec((err,estudiantes)=>{
            if(err){
                return res.status(400).send({
                    status:'error',
                    message:'No se encontaron datos'
                })
            }
            return res.status(400).send({
                status:'ok',
                estudiantes
            })
        })
    },
    getEstudiante:(req,res)=>{
        //Recoger el id de la url
        const {id}=req.params;
        console.log(id);
        if(!id || id==null){
            return res.status(500).send({
                status:'malo',
                message:'Error al devolver los datos'
            })
        }
        Estudiante.findById(id,(err,estudiante)=>{
            if(err){
                return res.status(400).send({
                    status:'malo',
                    message:'No se pudo procesar'
                })
            }
            if(!estudiante){
                return res.status(201).send({
                    status:'ok',
                    message:'Ingrese id correcto'
                })
            }
            return res.status(200).send({
                status:'ok',
                estudiante
            })
        })
    }
    
}
module.exports=controller;