const Estudiante=require('../models/EstudianteModel');
const fs=require('fs');
const path=require('path');
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
    
    
}
module.exports=controller;